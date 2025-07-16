import { describe, it, expect } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import loanApplicationReducer, { 
  updateField, 
  updateAgreementField, 
  addIncomeSource, 
  removeIncomeSource 
} from '../loanApplicationSlice'

describe('loanApplicationSlice', () => {
  let store: ReturnType<typeof configureStore>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        loanApplication: loanApplicationReducer,
      },
    })
  })

  it('should update loan details field', () => {
    store.dispatch(updateField({
      section: 'loanDetails',
      field: 'loanAmount',
      value: 25000
    }))

    const state = store.getState().loanApplication
    expect(state.loanDetails.loanAmount).toBe(25000)
  })

  it('should update personal info field', () => {
    store.dispatch(updateField({
      section: 'personalInfo',
      field: 'firstName',
      value: 'John'
    }))

    const state = store.getState().loanApplication
    expect(state.personalInfo.firstName).toBe('John')
  })

  it('should update agreement field', () => {
    store.dispatch(updateAgreementField({
      field: 'agreedToTerms',
      value: true
    }))

    const state = store.getState().loanApplication
    expect(state.agreementInfo.agreedToTerms).toBe(true)
  })

  it('should add income source', () => {
    const initialSourcesCount = store.getState().loanApplication.incomeInfo.sources.length
    
    store.dispatch(addIncomeSource())
    
    const state = store.getState().loanApplication
    expect(state.incomeInfo.sources).toHaveLength(initialSourcesCount + 1)
  })

  it('should remove income source by id', () => {
    const state = store.getState().loanApplication
    const sourceId = state.incomeInfo.sources[0].id
    
    store.dispatch(removeIncomeSource({ id: sourceId }))
    
    const newState = store.getState().loanApplication
    expect(newState.incomeInfo.sources.find(s => s.id === sourceId)).toBeUndefined()
  })
})