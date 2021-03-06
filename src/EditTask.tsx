import React from "react"
import {Flex} from "@chakra-ui/react"
import Logo from './assests/ShaastraLogo.png'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
  useDisclosure
} from '@chakra-ui/react'
import { Dialog } from '@material-ui/core'
import { useState } from "react"
import { useEditTaskMutation, useGetTaskQuery } from './generated/index'
import Header from './Header'
import { useHistory, useParams } from 'react-router'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import './TaskForm.css'

interface FuncProps {
  toggleForm: () => void
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

function EditTask(props: FuncProps) {
  const history = useHistory()
  const {id} : any = useParams()

  const {data: task, loading: taskLoad, error: taskError} = useGetTaskQuery({variables: {taskid: id}})

  var dateString = new Date(parseInt(task?.getTask.deadline!))

  const [name, setname] = useState(task?.getTask.brief ? task.getTask.brief : '')
  const [description, setdescription] = useState('')
  console.log(description)
  const [date, setDate] = useState(task?.getTask.deadline)
  const [inputdate, Setinputdate] = useState('')
  const [points, setpoints] = useState(0)
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write'
  )

  const [editTaskMutation, {data, loading, error}] = useEditTaskMutation()

  function handleChange() {
    history.push('/admintask')
  }

  async function handleSubmit(e: any) {
    // alert('You have submitted the form')
    e.preventDefault();
    console.log(name, description)
    try{
      await editTaskMutation({
        variables: {
          data: {
            brief: name,
            deadline: inputdate !== '' ? new Date(inputdate).toISOString()! : new Date(dateString.toLocaleDateString()).toISOString()!,
            details: description !== '' ? description! : task?.getTask.details!,
            maxPoints: points !== 0 ? points : task?.getTask.maxPoints!
          },
          taskid: id
        }
      })
    }
    catch(err) {console.log(err)}
  }
  if (data?.editTask == true) { 
    const closeHandler = () => {
      history.push('/admintask')
    }
    return (
      <Dialog onClose={closeHandler} open={true}>
        <p>Task Edited</p>
        <button onClick={closeHandler}>Close</button>
      </Dialog>
    )
  }
  if (loading || taskLoad) {
    return (
      <Dialog open={true}>
        <p>Loading...</p>
      </Dialog>
    )
  }
  if (error || taskError) {
    const closeHandler = () => {
      window.location.reload()
    }
    return (
      <Dialog onClose={closeHandler} open={true}>
        <p>Some error occurred.</p>
        <button onClick={closeHandler}>Close</button>
      </Dialog>
    )
  }
  return (
    <div className='task-form edit'>
      <div className='top-ctn'>
        <p>EDIT TASK</p>
        <button onClick={handleChange}>Close</button>
      </div>
      <form onSubmit={handleSubmit} className='main-form'>
        <div className='input-ctn'>
          <p>Name :</p>
          <input
            type='text'
            placeholder={task?.getTask.brief}
            onChange={(e) => setname(e.target.value)}
          ></input>
        </div>
        <div className='input-ctn'>
          <p>Description : {task?.getTask.details}</p>
          <ReactMde
            value={description}
            onChange={setdescription}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
        </div>
        <div className='input-ctn'>
          <p>Deadline : {dateString.toLocaleDateString()}</p>
          <input
            type='date'
            onChange={(e) => {
              // var d = e.target.value.split('-')
              // var newD = d[2] + '/' + d[1] + '/' + d[0]
              // var newInput = d[0] + '-' + d[1] + '-' + d[2]
              Setinputdate(e.target.value)
              // console.log(newD)
              // setdeadline(newD)
            }}
          ></input>
        </div>
        <div className='input-ctn'>
          <p>Points :</p>
          <input
          placeholder={`${task?.getTask.maxPoints!}`}
            type='number'
            onChange={(e) => setpoints(parseInt(e.target.value))}
          ></input>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default EditTask
