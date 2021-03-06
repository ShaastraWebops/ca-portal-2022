import React from 'react'
import { FaBullseye, FaHandPointRight, FaTimes } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useFillQuestionnaireMutation } from './generated'
import { Dialog, Box } from '@material-ui/core'
import Header from './Header'
import './Questionaire.css'
import { list } from '@chakra-ui/styled-system'
import { cities } from './cities'

function Questionaire() {
  const history = useHistory()
  const [TermsCondition, setTermsCondition] = React.useState<boolean>()
  const [pastCAExperiennce, setPastCAExperiennce] = React.useState<boolean>()
  const [pastExperiennce, setpastExperiennce] = React.useState<boolean>()
  const [facebookUrl, setfacebookUrl] = React.useState<boolean>(false)
  const [linkedinUrl, setlinkedinUrl] = React.useState<boolean>(false)
  const [twitterUrl, settwitterUrl] = React.useState<boolean>(false)
  const [instagramUrl, setinstagramUrl] = React.useState<boolean>(false)

  const [name, setName] = React.useState<string>()
  const [college, setCollege] = React.useState<string>()
  const [collegeaddress, setCollegeaddress] = React.useState<string>()
  const [city, setCity] = React.useState<string>('')
  const [state, setState] = React.useState<string>(
    'Andaman and Nicobar Islands'
  )
  const [Degree, setDegree] = React.useState<string>()
  const [branch, setBranch] = React.useState<string>()
  const [year, setYear] = React.useState<string>()
  const [postaladdress, setPostaladdress] = React.useState<string>()
  const [pcity, setPcity] = React.useState<string>('')
  const [pstate, setPstate] = React.useState<string>(
    'Andaman and Nicobar Islands'
  )
  const [pincode, setPincode] = React.useState<string>()
  const [contactno, setContactno] = React.useState<string>()
  const [whatsappno, setWhatsappno] = React.useState<string>()
  const [Q1, setQ1] = React.useState<string>()
  const [Q2, setQ2] = React.useState<string>()
  const [Q2a, setQ2a] = React.useState<boolean>()
  const [Q2b, setQ2b] = React.useState<boolean>()
  const [Q2c, setQ2c] = React.useState<boolean>()
  const [Q2d, setQ2d] = React.useState<boolean>()
  const [Q3, setQ3] = React.useState<string>()
  const [Q3a, setQ3a] = React.useState<string>()
  const [Q3b, setQ3b] = React.useState<string>()
  const [Q3c, setQ3c] = React.useState<string>()
  const [Q3d, setQ3d] = React.useState<string>()
  const [Q4, setQ4] = React.useState<string>()
  const [Q5, setQ5] = React.useState<string>()
  const [Q6, setQ6] = React.useState<string>()

  React.useEffect(() => {
    const list = []
    if (Q2a) list.push('Facebook')
    if (Q2b) list.push('LinkedIn')
    if (Q2c) list.push('Twitter')
    if (Q2d) list.push('Instagram')
    setQ2(list.join(', '))
  }, [Q2a, Q2b, Q2c, Q2d])

  React.useEffect(() => {
    const social = []
    if (Q3a !== '' && Q3a !== undefined) social.push(Q3a)
    if (Q3d !== '' && Q3b !== undefined) social.push(Q3b)
    if (Q3c !== '' && Q3c !== undefined) social.push(Q3c)
    if (Q3d !== '' && Q3d !== undefined) social.push(Q3d)
    setQ3(social.join(', '))
  }, [Q3a, Q3b, Q3c, Q3d])

  const [fillQuestionnaireMutation, { data, loading, error }] =
    useFillQuestionnaireMutation()

  const submitQuestionnaire = async (e: any) => {
    e.preventDefault()
    try {
      await fillQuestionnaireMutation({
        variables: {
          questionnaireInput: {
            college: college!,
            collegeaddress: collegeaddress!,
            city: city!,
            state: state!,
            Degree: Degree!,
            branch: branch!,
            year: year!,
            postaladdress: postaladdress!,
            pcity: pcity!,
            pstate: pstate!,
            pincode: pincode!,
            contactno: contactno!,
            whatsappno: whatsappno!,
            Q1: pastCAExperiennce ? Q1! : 'NO',
            Q2: Q2!,
            Q3: Q3!,
            Q4: Q4!,
            Q5: Q5!,
            Q6: pastExperiennce ? Q6! : 'NO',
          },
        },
      })
    } catch (e) {
      console.log(e)
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
  }

  if (loading) {
    return (
      <Dialog open={true}>
        <p>Loading...</p>
      </Dialog>
    )
  }
  if (error) {
    if (
      error.message.includes('duplicate key value violates unique constraint')
    ) {
      const closeHandler = () => {
        history.push('/')
      }
      return (
        <Dialog onClose={closeHandler} open={true}>
          <p>Questionnaire has been filled already</p>
          <button onClick={closeHandler}>Close</button>
        </Dialog>
      )
    }
    if (error.message.includes('Access denied!')) {
      const closeHandler = () => {
        history.push('/login')
      }
      return (
        <Dialog onClose={closeHandler} open={true}>
          <p>Please login to continue.</p>
          <button onClick={closeHandler}>Close</button>
        </Dialog>
      )
    } else {
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
  }
  if (data) {
    if (data.fillQuestionnaire) {
      history.replace('/me')
    } else {
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
  }

  return (
    <>
      <Header />
      <div className='Questionaire'>
        <h1>APPLICATION</h1>
        <form onSubmit={submitQuestionnaire}>
          <div className='wrapper'>
            <div className='left'>
              <input
                required
                type='text'
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                name='name'
                placeholder='NAME'
              />
              <input
                required
                type='text'
                value={college}
                onChange={(e: any) => setCollege(e.target.value)}
                name='college'
                placeholder='COLLEGE NAME'
              />
              <input
                required
                type='text'
                value={collegeaddress}
                onChange={(e: any) => setCollegeaddress(e.target.value)}
                name='coll-add'
                placeholder='COLLEGE ADDRESS'
              />
              <div className='dropdown-ctn'>
                <label htmlFor='state'>COLLEGE STATE</label>
                <select
                  required
                  name='state'
                  id='state'
                  onChange={(e: any) => setState(e.target.value)}
                  placeholder='Select State'
                >
                  <option key='default' value='' selected>
                    Select College State
                  </option>
                  {Object.keys(cities).map((_state: any) => {
                    return (
                      <option key={_state} value={_state}>
                        {_state}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className='dropdown-ctn'>
                <label htmlFor='city'>COLLEGE CITY</label>
                <select
                  required
                  name='city'
                  id='city'
                  onChange={(e: any) => setCity(e.target.value)}
                  placeholder='Select City'
                >
                  <option key='default' value='' selected>
                    Select College City
                  </option>
                  {cities[state].map((_city: any) => {
                    return (
                      <option key={_city} value={_city}>
                        {_city}
                      </option>
                    )
                  })}
                </select>
              </div>
              {/**<input
                required
                type='text'
                value={city}
                onChange={(e: any) => setCity(e.target.value)}
                name='coll-city'
                placeholder='CITY'
              />
              <input
                required
                type='text'
                value={state}
                onChange={(e: any) => setState(e.target.value)}
                name='coll-state'
                placeholder='STATE'
              />**/}
              <input
                required
                type='text'
                value={Degree}
                onChange={(e: any) => setDegree(e.target.value)}
                name='degree'
                placeholder='DEGREE'
              />
              <input
                required
                type='text'
                value={branch}
                onChange={(e: any) => setBranch(e.target.value)}
                name='branch'
                placeholder='BRANCH'
              />
              <input
                required
                type='text'
                value={year}
                onChange={(e: any) => setYear(e.target.value)}
                name='year'
                placeholder='YEAR OF GRADUATION'
              />
            </div>
            <div className='right'>
              <textarea
                required
                value={postaladdress}
                onChange={(e: any) => setPostaladdress(e.target.value)}
                name='address'
                placeholder='POSTAL ADDRESS'
              ></textarea>
              <div className='dropdown-ctn'>
                <label htmlFor='pstate'>POSTAL STATE</label>
                <select
                  required
                  name='state'
                  id='state'
                  onChange={(e: any) => setPstate(e.target.value)}
                  placeholder='Select State'
                >
                  <option key='default' value='' selected>
                    Select Postal State
                  </option>
                  {Object.keys(cities).map((_pstate: any) => {
                    return (
                      <option key={_pstate} value={_pstate}>
                        {_pstate}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className='dropdown-ctn'>
                <label htmlFor='pcity'>POSTAL CITY</label>
                <select
                  required
                  name='city'
                  id='city'
                  onChange={(e: any) => setPcity(e.target.value)}
                  placeholder='Select City'
                >
                  <option key='default' value='' selected>
                    Select Postal City
                  </option>
                  {cities[pstate].map((_pcity: any) => {
                    return (
                      <option key={_pcity} value={_pcity}>
                        {_pcity}
                      </option>
                    )
                  })}
                </select>
              </div>
              {/**<input
                required
                type='text'
                value={pcity}
                onChange={(e: any) => setPcity(e.target.value)}
                name='city'
                placeholder='CITY'
              />
              <input
                required
                type='text'
                value={pstate}
                onChange={(e: any) => setPstate(e.target.value)}
                name='state'
                placeholder='STATE'
              />**/}
              <input
                required
                type='text'
                value={pincode}
                onChange={(e: any) => setPincode(e.target.value)}
                name='pincode'
                placeholder='PINCODE'
              />
              <input
                required
                type='text'
                value={contactno}
                onChange={(e: any) => setContactno(e.target.value)}
                name='con-num'
                placeholder='CONTACT NUMBER'
              />
              <input
                required
                type='text'
                value={whatsappno}
                onChange={(e: any) => setWhatsappno(e.target.value)}
                name='whatsapp-num'
                placeholder='WHATSAPP NUMBER'
              />
            </div>
          </div>
          <h3>OTHER GENERAL QUESTIONS</h3>
          <p className='required'>Were you a Shaastra CA previously ? </p>
          <div className='inputBox'>
            <input
              required
              type='radio'
              name='previouslyCA'
              value='yes'
              onClick={() => setPastCAExperiennce(true)}
            />
            <label>YES</label>
            <input
              required
              type='radio'
              name='previouslyCA'
              value='no'
              onClick={() => setPastCAExperiennce(false)}
            />
            <label>NO</label>
          </div>
          <p
            className='required'
            style={{
              display: pastCAExperiennce ? 'block' : 'none',
            }}
          >
            If Your answer to the above question is yes, which year ?{' '}
          </p>
          <select
            required={pastCAExperiennce}
            name='previouslyCAyear'
            style={{
              display: pastCAExperiennce ? 'block' : 'none',
            }}
            onChange={(e: any) => setQ1(e.target.value)}
            value={Q1}
          >
            <option value=''>SELECT</option>
            <option value='2021'>2021</option>
            <option value='2020'>2020</option>
            <option value='2019'>2019</option>
            <option value='2018'>2018</option>
            <option value='2017'>2017</option>
            <option value='2016'>2016</option>
            <option value='2015'>2015</option>
            <option value='2013'>2013</option>
          </select>
          <p className='required'>Which social media sites do you use ? </p>
          <div className='inputBox socialUse'>
            <input
              type='checkbox'
              name='socialHandles'
              id=''
              checked={Q2a}
              onChange={() => setQ2a(!Q2a)}
              onClick={() => setfacebookUrl(!facebookUrl)}
            />
            <label>Facebook</label>
            <input
              type='checkbox'
              name='socialHandles'
              id=''
              checked={Q2b}
              onChange={() => setQ2b(!Q2b)}
              onClick={() => setlinkedinUrl(!linkedinUrl)}
            />
            <label>LinkedIn</label>
            <input
              type='checkbox'
              name='socialHandles'
              id=''
              checked={Q2c}
              onChange={() => setQ2c(!Q2c)}
              onClick={() => settwitterUrl(!twitterUrl)}
            />
            <label>Twitter</label>
            <input
              type='checkbox'
              name='socialHandles'
              id=''
              checked={Q2d}
              onChange={() => setQ2d(!Q2d)}
              onClick={() => setinstagramUrl(!instagramUrl)}
            />
            <label>Instagram</label>
          </div>
          {/* <input required type="text" placeholder="(Short answer type)" /> */}
          <p
            style={{
              display: facebookUrl ? 'block' : 'none',
            }}
          >
            Facebook Profile Link:{' '}
          </p>
          <input
            style={{
              display: facebookUrl ? 'block' : 'none',
            }}
            type='url'
            placeholder='URL'
            onChange={(e: any) => setQ3a(e.target.value)}
            value={Q3a}
          />
          <p
            style={{
              display: linkedinUrl ? 'block' : 'none',
            }}
          >
            LinkedIn Profile Link:{' '}
          </p>
          <input
            style={{
              display: linkedinUrl ? 'block' : 'none',
            }}
            type='url'
            placeholder='URL'
            onChange={(e: any) => setQ3b(e.target.value)}
            value={Q3b}
          />
          <p
            style={{
              display: twitterUrl ? 'block' : 'none',
            }}
          >
            Twitter Profile Link:{' '}
          </p>
          <input
            style={{
              display: twitterUrl ? 'block' : 'none',
            }}
            type='url'
            placeholder='URL'
            onChange={(e: any) => setQ3c(e.target.value)}
            value={Q3c}
          />
          <p
            style={{
              display: instagramUrl ? 'block' : 'none',
            }}
          >
            Instagram Profile Link:{' '}
          </p>
          <input
            style={{
              display: instagramUrl ? 'block' : 'none',
            }}
            type='url'
            placeholder='URL'
            onChange={(e: any) => setQ3d(e.target.value)}
            value={Q3d}
          />

          <p className='required'>
            Why do you wish to become a Campus Ambassador ?{' '}
          </p>
          <textarea
            required
            placeholder='(Short answer type)'
            onChange={(e: any) => setQ4(e.target.value)}
            value={Q4}
          />
          <p className='required'>
            Why do you think you are the right candidate for this position ?{' '}
          </p>
          <textarea
            required
            placeholder='(Short answer type)'
            onChange={(e: any) => setQ5(e.target.value)}
            value={Q5}
          />
          <p className='required'>
            Do you have any past experience in handling Positions of
            Responsibility ?{' '}
          </p>
          <div style={{ marginBottom: '10px' }} className='inputBox'>
            <input
              required
              type='radio'
              onClick={() => setpastExperiennce(true)}
              name='pastExperience'
              value='yes'
            />
            <label>YES</label>
            <input
              required
              type='radio'
              onClick={() => setpastExperiennce(false)}
              name='pastExperience'
              value='no'
            />
            <label>NO</label>
          </div>
          <textarea
            required={pastExperiennce}
            style={{
              display: pastExperiennce ? 'block' : 'none',
            }}
            placeholder='Describe the experience'
            value={Q6}
            onChange={(e: any) => setQ6(e.target.value)}
          />
          <div className='inputBox termsUse'>
            <input required type='checkbox' />
            <label>
              I wish to represent Shaastra 2022 for my institute and I have read
              and agree to all the{' '}
              <span
                style={{ color: '#564ed3', cursor: 'pointer' }}
                onClick={() => setTermsCondition(true)}
              >
                Terms and Conditions
              </span>{' '}
              stated by Shaastra for the Campus Ambassador Program on the CA
              website.
            </label>
          </div>
          <button>SUBMIT</button>
        </form>
        <div className={`termsAndCondition ${TermsCondition ? 'active' : ''}`}>
          <h2>
            TERMS AND CONDITIONS FOR CA PROGRAM, SHAASTRA 2022, IIT MADRAS
          </h2>
          <button onClick={() => setTermsCondition(false)}>
            <FaTimes />
          </button>
          <ul>
            <li>
              <FaHandPointRight />
              <p>
                The CA will be a part of the organizing team of Shaastra 2022
                and he/she must ensure that his/her college has no objection to
                this. Shaastra will not be responsible for any issues arising
                due to objection of college authorities in the later stage
              </p>
            </li>
            <li>
              <FaHandPointRight />
              <p>
                The internship certificate will only be provided subject to
                completion of fixed minimum points
              </p>
            </li>
            <li>
              <FaHandPointRight />
              <p>
                Shaastra reserves the right to change the points awarded for
                every task and minimum points required for the certificate as
                well as bonus incentives and goodies.
              </p>
            </li>
            <li>
              <FaHandPointRight />
              <p>
                Tasks allotted to CAs will include, but not be limited to:
                <ul>
                  <li>
                    <FaBullseye />
                    Putting up posters
                  </li>
                  <li>
                    <FaBullseye />
                    Sharing posts put up by the Shaastra Facebook page
                  </li>
                  <li>
                    <FaBullseye />
                    Sending mails for publicity
                  </li>
                  <li>
                    <FaBullseye />
                    Getting MoUs signed
                  </li>
                  <li>
                    <FaBullseye />
                    Taking care of organizational aspects of events including
                    facilities and requirements
                  </li>
                  <li>
                    <FaBullseye />
                    Visiting colleges or other public venues for carrying out
                    on-ground publicity
                  </li>
                  <li>
                    <FaBullseye />
                    Getting participants through referrals
                  </li>
                </ul>
              </p>
            </li>
            <li>
              <FaHandPointRight />
              <p>
                All official communication will be done via the CA portal and
                email. It is the responsibility of the CA to check his/her email
                and the CA portal regularly and acknowledge the tasks assigned
                to him/her.
              </p>
            </li>
            <li>
              <FaHandPointRight />
              <p>
                Should there be any discrepancies or issues, the decision taken
                by Shaastra shall be final and binding
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Questionaire
