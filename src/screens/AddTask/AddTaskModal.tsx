import * as React from "react"
import { Button, Text, TouchableOpacity, View, StyleSheet, TextInput, Keyboard } from "react-native"
import { Icon } from "../../components"
import { colors } from "../../theme"
import Modal from "react-native-modal"
import { useEffect, useState } from "react"

const AddTaskModal = () => {
  const [modalVisible, setModalVisible] = useState(false)

  let inputRef = React.useRef(null)

  const onSubmit = () => {
    setModalVisible(false)
  }


  useEffect(() => {

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setModalVisible(false)
    })

    return () => {

      hideSubscription.remove()
    }
  }, [])


  return <>
    <TouchableOpacity onPress={() => {
      setModalVisible(true)
    }} style={s.buttonStyle}>
      <Icon icon={"plus"} size={35} color={colors.palette.angry500} />
    </TouchableOpacity>
    <View>

      <Modal onModalShow={() => {
        // @ts-ignore
        inputRef.blur()
        // @ts-ignore
        inputRef.focus()
      }}
             animationIn={'slideInUp'}
             animationOut={'fadeOut'}
             backdropTransitionOutTiming={0}
             animationOutTiming={0}
             avoidKeyboard={true}
             backdropOpacity={0.3}
             isVisible={modalVisible}
             onBackdropPress={() => setModalVisible(false)}
             style={s.contentView}
      >
        <View style={s.content}>
          {/*@ts-ignore*/}
          <TextInput ref={ref => inputRef = ref}
                     autoFocus={true}
                     placeholder={'What to do?'}
                     style={{ backgroundColor: "white" }}
                     onSubmitEditing={onSubmit}

          />
        </View>
      </Modal>
    </View>
  </>
}

const s = StyleSheet.create({
  content: {
    backgroundColor: colors.background,
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12
  },
  contentView: {
    justifyContent: "flex-end",
    margin: 0
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center"

  }
})

export { AddTaskModal }
