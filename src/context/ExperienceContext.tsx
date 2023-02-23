import { createContext, useContext, useState } from "react"

const ExperienceContext = createContext<any>({ activeSeat: null })

function ExperienceProvider({ children }: any) {
  const [state, setState] = useState({ activeSeat: null })
  const value = [state, setState]
  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}
function useExperience() {
  const context = useContext(ExperienceContext)

  if (context === undefined) {
    throw new Error('useExperience must be used within a ExperienceProvider')
  }

  return context
}

export { ExperienceProvider, ExperienceContext, useExperience }
