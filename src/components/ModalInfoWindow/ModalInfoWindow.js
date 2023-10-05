import { View, Text, Modal } from 'react-native'
import React from 'react'
import styled from 'styled-components'

const ModalInfoWindow = ({open, children}) => {
  return (
    <Modal
    visible={open}
    animationType="fade"
    transparent={true}
    >
        <ModalWindow>
            {children}
        </ModalWindow>
    </Modal>
  )
}

const ModalWindow = styled.View`
background-color: rgba(0, 0, 0, 0.4);
flex-grow: 1;
align-items: center;
justify-content: center;
`

export default ModalInfoWindow