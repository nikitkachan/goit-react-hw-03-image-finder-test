import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import { LoeaderWrapper } from './Loader.styled'

const Loader = () => {
  return (
   <LoeaderWrapper>
         <InfinitySpin 
  width='200'
  color="#353535"
    /> 
   </LoeaderWrapper>
      
  )
}

export default Loader