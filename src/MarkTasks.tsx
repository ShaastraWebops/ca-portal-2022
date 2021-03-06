import React from 'react'
import shaastraLogo from './assets/Shaastra_logo.png'
import { FaSearch, FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './MarkTasks.css'
import { useState,useRef } from 'react'
import { useHistory } from 'react-router'
import { Dialog } from '@material-ui/core';
import Header from "./Header"
import { GetUsersFilter, useGetTaskreviewQuery, useGetTasksQuery, useGetUsersQuery, useReviewTaskMutation, UserRole} from "./generated";
import { stringify } from 'querystring'
import { useDisclosure } from "react-use-disclosure";
import {Box,Modal} from "@chakra-ui/react"

function MarkTasks() {

  const {
   isOpen: isModalOpen,
   open: openModal,
   close: closeModal
  } = useDisclosure();
  const focusRow = useRef(null);
  const [reviewTaskMutation, {data:review, loading:reviewLoad, error:reviewError}] = useReviewTaskMutation()
  const [caName, setcaName] = React.useState('')
  const [points, setpoints] = React.useState(0)
  const [feedback, setfeedback] = React.useState('')
  const [filter, setFilter] = React.useState<GetUsersFilter>({role: UserRole.Selected });

  const {data: tasks, loading: taskLoad, error: taskError} = useGetTasksQuery({variables:{skip:null, limit:10000}})
 
  const {data, loading, error} = useGetUsersQuery({
    variables: {
      filter: filter,
    }
  })

  const history = useHistory()
  const [id, setId] = useState('')

  var url: string[] = []
  if(error?.message.includes("Access denied!")|| taskError?.message.includes("Access denied!"))
  {
    const closeHandler= () => {history.push('/login')}
        return(
          <Dialog onClose={closeHandler} open={true} >
              <p>Please login to continue.</p>
              <button onClick={closeHandler}>Close</button>
          </Dialog>
      );
  }

  if(review?.reviewTask)
  {
    const closeHandler = () => {window.location.reload()}
    return(
        <Dialog onClose={closeHandler} open={true}>
          <p>Review added</p>
          <button onClick={closeHandler}>Close</button>
      </Dialog>
    )
  }
  if(reviewLoad || loading || taskError)
  {
    return(
      <Dialog open={true}>
        <p>Loading...</p>
    </Dialog>)
  }
  if(reviewError)
  {
    const closeHandler = () => {window.location.reload()}
    console.log(reviewError)
    return(
        <Dialog onClose={closeHandler} open={true}>
          <p>Error occured</p>
          <button onClick={closeHandler}>Close</button>
      </Dialog>
    ) 
  }
  const save = async (n:any) => {
      await reviewTaskMutation({variables: {data: {
        reviewid: n,
        review: feedback,
        points: points
      }}})
  }
  return (
    <div className='mark-tasks'>
      <Header></Header>
      <div className='header'>
        <h1>MARK TASKS</h1>
        <div className='search-container'>
          <input className='search-bar' placeholder='Search for CA' onChange={(e: any) => {setcaName(e.target.value); console.log(e.target.value)}}></input>
        </div>
        <div className='menu-ctn'>
          <select name="coord" onChange={(e:any) => {setFilter({role: UserRole.Selected, coord: e.target.value})}}>
            <option value='0'>COORD NAME</option>
              <option value="Anshid">Anshid</option>
              <option value="Samrudha Lakshmi">Samrudha Lakshmi</option>
              <option value="Poojitha R">Poojitha R</option>
              <option value="Sukriti">Sukriti </option>
              <option value="Vishwa">Vishwa</option>
              <option value="Pavan Kumar">Pavan Kumar</option>
              <option value="Joshik Sravan">Joshik Sravan</option>
              <option value="Sadguru Sharan">Sadguru Sharan</option>
              <option value="Keerthana">Keerthana</option>
              <option value="Ankit">Ankit</option>
              <option value="Gokul Vijay">Gokul Vijay</option>
              <option value="Vinaykumar">Vinaykumar</option>
              <option value="Aditya">Aditya</option>
              <option value="Rahul Bumb">Rahul Bumb</option>
              <option value="Umesh">Umesh</option>
              <option value="Reethika">Reethika</option>
          </select>
          <select
            name='caName'
            id='caName'
            onChange={(e: any) => {setcaName(e.target.value); console.log(e.target.value)}}
            placeholder='Campus Ambassador'
          >
            <option value='0'>CAMPUS AMBASSADOR</option>
            { 
              data?.getUsers?.users.map(el => { console.log(el)
                return(<option value={el.name}>{el.name}</option>)})  
            }
          </select>
        </div>
      </div>
      <div className='task-lists'>
        {
          data?.getUsers?.users.filter(u => {
            if(caName === "") return u;
            else if(u.name?.toLocaleLowerCase().includes(caName.toLocaleLowerCase())) return u;
                 else if(!u.name?.toLocaleLowerCase().includes(caName.toLocaleLowerCase())) {}
          })
          .map(el => {
            //console.log(el.taskReviews)
            return(
              <div className='task-lists'>
        <div className='list-header'>
          <p>{el.name}</p>
          <p className='green-text'>TOTAL POINTS : {el.totalPoints}</p>
        </div>
        <table className='task-table'>
          <tr>
            <th>Task id</th>
            <th>Tasks</th>
            <th>Proofs</th>
            <th>Points</th>
            <th>Feedback</th>
          </tr>
          {/* {
            tasks?.getTasks.map(t => {
              if(t.taskReviews[0])
              {
                var R :any = {}
                t.taskReviews.map(r => {
                  R = el.taskReviews.find(i => i.taskurl === r.taskurl)
                })
                if(R?.reviewID !== undefined) id = R.reviewID
                if(R)
                return(
                  <tr>
              <td>{t.brief}</td>
              <td><a href={R.taskurl}>{t.taskReviews[0].taskurl}</a></td>
              <td>
                <input
                  value={R.points!}
                  name='points'
                  placeholder='Points'
                ></input>
              </td>
              <td>
                <input
                  type='text'
                  value={R.review!}
                  name='feedback'
                  placeholder='Feedback'
                ></input>
              </td>
              <Button onClick={onOpen}>Edit</Button>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent width="50vw" margin="auto" marginTop="10vh" backgroundColor="#574ed3b2" padding="1vw" borderRadius="24px" boxShadow="5px 10px 20px rgba(0, 0, 0, 0.486)">
                  
                  <ModalBody>
                  <input
                  name='points'
                  type="number"
                  value={points}
                  placeholder='Points'
                  onChange={(e: any) => 
                    {
                      setpoints(parseInt(e.target.value))
                    }}
                  ></input>
                  <br />
                  <input
                  type='text'
                  value={feedback}
                  name='feedback'
                  onChange={(e: any) => setfeedback(e.target.value)}
                  placeholder='Feedback'
                  ></input>
                  <br />
                  <button className='save-btn' onClick={async (e) => {
                      e.preventDefault();
                      console.log(typeof(id))
                      try 
                      {
                        var temp : string = id
                        await reviewTaskMutation({variables: {data: {
                          reviewid: id,
                          review: feedback,
                          points: points
                        }}})
                      }
                      catch(e){console.log(e)}
                      id = ''
                    }}>
                    Save Changes
                  </button>
                  </ModalBody>

                  <ModalFooter>
                    <Button borderRadius="12px"
                    colorScheme="blue" mr={3} onClick={onClose} backgroundColor="white" border="none" padding="0.5vw">
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </tr>
                )
                else 
                { console.log(t.taskReviews, el)
              return(
                <tr>
                  <td>{t.brief}</td>
                  <td>proof not submitted</td>
                </tr>
              )
                }
              }
            })
          } */}
          {
            tasks?.getTasks.map(t => {
              var R:any = {}
              //console.log(t.taskReviews)
              el.taskReviews.map(r => {
                t.taskReviews.map(tr => {
                  if(tr.reviewID  === r.reviewID) R = tr
                })
              })
               if(R )
               {
                // if(R.reviewID !== undefined) id = R.reviewID
                // console.log(R, id)
                return(
                  <tr>
                    <td>{R.reviewID}</td>
                    <td>{t.brief}</td>
                    <td>
                      <ul>
                        {
                          R.taskurl?.split(" ")?.map((u:any) => {
                            return(
                              <li><a href={u}>{u}</a></li>
                            )
                          })
                        }
                      </ul>
                    </td>
                    <td>
                      <input
                        value={R.points!}
                        name='points'
                        placeholder='Points'
                      ></input>
                    </td>
                    <td>
                      <input
                        type='text'
                        value={R.review!}
                        name='feedback'
                        placeholder='Feedback'
                      ></input>
                    </td>
                    <button onClick={openModal} className='btn-ctn'>Edit</button>   
                </tr>
                )
            }
              else 
              return(
                <tr>
                  <td>{t.brief}</td>
                  <td>proof not submitted</td>
                </tr>
              )
            })
          }
        </table>
      </div>
            )
          })
        }
         
      </div>
       {isModalOpen ? ( <Box width="50vw" margin="auto" marginTop="10vh" backgroundColor="#574ed3b2" padding="1vw" borderRadius="24px" boxShadow="5px 10px 20px rgba(0, 0, 0, 0.486)" className='points-form-ctn'>
                          <input 
                            name='id'
                            type='text'
                            value={id}
                            placeholder='Task Id'
                            onChange={(e:any) => {
                              setId(e.target.value)
                            }}
                          /> 
                        <input
                        name='points'
                        type="number"
                        value={points}
                        placeholder='Points'
                        onChange={(e: any) => 
                          {
                            setpoints(parseInt(e.target.value))
                          }}
                        ></input>
                        <br />
                        <input
                        type='text'
                        value={feedback}
                        name='feedback'
                        onChange={(e: any) => setfeedback(e.target.value)}
                        placeholder='Feedback'
                        ></input>
                        <br />
                        <button className='save-btn' onClick={async (e) => {
                          //console.log(R, id)
                            try 
                            {
                              await reviewTaskMutation({variables: {data: {
                                reviewid: id,
                                review: feedback,
                                points: points
                              }}})
                            }
                            catch(e){console.log(e)}
                            setId('')
                          }}>
                          Save Changes
                        </button>
                          <button onClick={closeModal} className='save-btn'>
                            Close
                          </button>
                        </Box>):(<div></div>)}
    </div>
  )
}

export default MarkTasks
