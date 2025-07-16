import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'

// Mock axios properly
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      post: vi.fn(),
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      interceptors: {
        request: {
          use: vi.fn(),
        },
        response: {
          use: vi.fn(),
        },
      },
    })),
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

const mockedAxios = vi.mocked(axios)

// Import after mocking
const { signUp, signIn, submitApplication } = await import('../api')

describe('API Functions', () => {
  let mockApiInstance: any
  
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Setup mock API instance
    mockApiInstance = {
      post: vi.fn(),
      get: vi.fn(),
      interceptors: {
        request: { use: vi.fn() }
      }
    }
    mockedAxios.create.mockReturnValue(mockApiInstance)
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    })
  })

  describe('signUp', () => {
    it('should return success data on successful signup', async () => {
      const mockResponse = {
        data: {
          token: 'test-token',
          user: { id: '1', email: 'test@example.com', name: 'Test User' }
        }
      }
      mockApiInstance.post.mockResolvedValueOnce(mockResponse)

      const result = await signUp({ email: 'test@example.com', password: 'password123' })

      expect(result.data).toEqual(mockResponse.data)
      expect(result.error).toBeUndefined()
    })

    it('should return error on failed signup', async () => {
      const mockError = {
        response: {
          data: { message: 'Email already exists' }
        }
      }
      mockApiInstance.post.mockRejectedValueOnce(mockError)

      const result = await signUp({ email: 'test@example.com', password: 'password123' })

      expect(result.error).toEqual({ message: 'Email already exists' })
      expect(result.data).toBeUndefined()
    })
  })

  describe('signIn', () => {
    it('should save token to localStorage on successful login', async () => {
      const mockResponse = {
        data: {
          token: 'auth-token',
          user: { id: '1', email: 'test@example.com', name: 'Test User' }
        }
      }
      mockApiInstance.post.mockResolvedValueOnce(mockResponse)
      const setItemSpy = vi.spyOn(localStorage, 'setItem')

      const result = await signIn({ email: 'test@example.com', password: 'password123' })

      expect(result.data).toEqual(mockResponse.data)
      expect(setItemSpy).toHaveBeenCalledWith('authToken', 'auth-token')
    })
  })

  describe('submitApplication', () => {
    it('should submit application data successfully', async () => {
      const mockResponse = {
        data: { id: 'app-123', message: 'Application submitted successfully' }
      }
      mockApiInstance.post.mockResolvedValueOnce(mockResponse)

      const applicationData = {
        loanDetails: { loanPurpose: 'debt-consolidation', loanAmount: 15000 },
        personalInfo: { 
          firstName: 'John', 
          lastName: 'Doe',
          suffix: '',
          birthMonth: '01',
          birthDay: '01',
          birthYear: '1990',
          streetAddress: '123 Main St',
          aptSuite: '',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          housingStatus: 'own',
          phoneNumber: '555-1234',
          textUpdatesConsent: true,
          educationLevel: 'bachelors'
        },
        educationInfo: {
          lastEnrolledYear: '2020',
          schoolName: 'Test University',
          graduationYear: '2020',
          areaOfStudy: 'Computer Science'
        },
        incomeInfo: { sources: [] },
        financialInfo: {
          savingsAmount: '10000',
          investmentAmount: '5000',
          hasRecentLoans: false,
          vehicleOwnershipStatus: 'own',
          vehicleMileage: '50000'
        },
        agreementInfo: { agreedToTerms: true }
      }

      const result = await submitApplication(applicationData)

      expect(result.data).toEqual(mockResponse.data)
      expect(mockApiInstance.post).toHaveBeenCalledWith('application', applicationData)
    })
  })
})