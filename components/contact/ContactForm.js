import { useState} from "react"
import useInput from "../../hooks/useInput";
import {Button, Card, Input, useTheme,  Text, Textarea, Spacer, Loading, Checkbox, Dropdown} from '@nextui-org/react';
import CSS from './ContactForm.module.css';
import ReCAPTCHA from "react-google-recaptcha";
import {Modal} from "../modal/Modal";
import { Flex } from "@components/styles/flex";


function ContactForm(){

    const description = "";
    const mobile = "";
    const require_captcha = true;

    const fullDescription = description.replace("*", mobile);

    const [captcha, setCaptcha] = useState();
    const [toggleModal, setToggleModal] = useState(false);

    const { isDark, setTheme } = useTheme()
    
    const [sendStatus, setSendStatus] = useState("default");

    const [selectedDropdown, setSelectedDropdown] = useState(new Set(["General Feedback"]));

    const {
        value: enteredName,
        isValid: nameIsValid,
        hasError: nameInputHasError,
        resetValue: nameResetValue,
        valueChangedHandler: nameChangedHandler,
        valueBlurHandler: nameBlurHandler,
    } = useInput(value => value.trim() !== "");

    const { 
        value: enteredEmail, 
        isValid: emailIsValid,
        hasError: emailInputHasError, 
        resetValue: emailResetValue,
        valueChangedHandler: emailChangedHandler, 
        valueBlurHandler: emailBlurHandler
    } = useInput(value => value.trim() !== "" && value.includes("@") && value.includes("."));

    const { 
        value: enteredSubject, 
        isValid: subjectIsValid,
        hasError: subjectInputHasError, 
        resetValue: subjectResetValue,
        valueChangedHandler: subjectChangedHandler, 
        valueBlurHandler: subjectBlurHandler
    } = useInput(value => value.trim() !== "");

    const { 
        value: enteredMessage, 
        isValid: messageIsValid,
        hasError: messageInputHasError, 
        resetValue: messageResetValue,
        valueChangedHandler: messageChangedHandler, 
        valueBlurHandler: messageBlurHandler
    } = useInput(value => value.trim() !== "");

    let formIsValid = false;
    if(nameIsValid && emailIsValid && messageIsValid && (!require_captcha || captcha))
    {
        formIsValid = true;
    }

    function clearValues(){
        nameResetValue();
        emailResetValue();
        messageResetValue();
    }

    function formSubmitHandler(event){
        event.preventDefault();

        const sendData = {
            name: enteredName,
            email: enteredEmail,
            message: enteredMessage,
        }
        if(formIsValid)
        {
            setSendStatus("sending");
            fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendData),
            })
            .then(data => {
                if(data.status === 200)
                {
                    setTimeout(mailSent, 2000)
                }
                else
                {
                    setTimeout(mailFailed, 2000)
                }
                console.log("Response", data.status)
            }).catch(error => {
                setTimeout(mailFailed, 2000)
                console.error("Error sending packing data", error);
            })
        }
        else
        {
            setToggleModal(true);
        }
    };

    function mailSent(){
        setSendStatus("success");
        clearValues();
    }
    function mailFailed(){
        setSendStatus("error");
    }

    function closeModal(){
        setToggleModal(false);
    }

    const nameStatus = nameInputHasError ? "error" : "default";
    const emailStatus = emailInputHasError ? "error" : "default";
    const messageStatus = messageInputHasError ? "error" : "default";
    const subjectStatus = subjectInputHasError ? "error" : "default";

    let sendText = "Send";
    if(sendStatus === "sending")
    {
        sendText="Sending"
    }
    if(sendStatus === "success")
    {
        sendText="Email Sent"
    }
    if(sendStatus === "error")
    {
        sendText="Email Failed"
    }

    //todo: p classname = error-text is not a class

   return(
<>
    <Flex direction={'column'}
       css={{'gap': '0rem', 'pt': '$0', 'justifyContent': 'center', 'alignItems': 'center','px': '$6',
          '@sm': { gap: '0rem', flexDirection: 'row-reverse', px: '$0', },
          '@md': { justifyContent: 'space-evenly',},}}
    >
       <Flex direction="column" align={'center'}>
                <Text h1 css={{display: 'inline', pointerEvents: "none", }}>
                    Feedback Form
                </Text>
            <Text span css={{ maxWidth: '600px',color: '$accents8', p: "$0"}}>
                    {fullDescription}
            </Text>
          <Flex justify={'center'} wrap={'wrap'} css={{ padding: '$0', px: "$10"}}>
        {toggleModal && <Modal title={"Please fill out each field"} onClose={closeModal}/>}

        <Card css={{padding: "0", margin: "10px"}}>
            <form onSubmit={formSubmitHandler} className={CSS.auth} >
                <Flex css={{justifyContent: "center", py: '$4', gap: '$0',}}>
                    <Input status={nameStatus} labelPlaceholder="Full Name" bordered={isDark} clearable value={enteredName} onBlur={nameBlurHandler} onChange={nameChangedHandler} placeholder="John Smith" type="text" id="name" name="from_name" aria-label="Full Name"/>
                </Flex>
                <Spacer />
                <Flex css={{justifyContent: "center", py: '$4', gap: '$5',}}>
                    <Input status={emailStatus} labelPlaceholder="Email" bordered={isDark} clearable value={enteredEmail}  onBlur={emailBlurHandler} onChange={emailChangedHandler} placeholder="JohnSmith@gmail.com" type='email' id='email' name="email" aria-label="Email Address" />
                </Flex>
                <Spacer />
                <Flex css={{justifyContent: "center", py: '$8', gap: '$5',}}>
                    <Textarea status={subjectStatus} labelPlaceholder="Subject" bordered={isDark} value={enteredSubject} onBlur={subjectBlurHandler} onChange={subjectChangedHandler} placeholder="Subject" minRows={2} maxRows={2} cols={26} id='subject' name="subject" aria-label="Subject"/>
                </Flex>
                <Flex css={{justifyContent: "center", py: '$8', gap: '$5',}}>
                    <Textarea status={messageStatus} labelPlaceholder="Message" bordered={isDark} value={enteredMessage} onBlur={messageBlurHandler} onChange={messageChangedHandler} placeholder="Hey Lets get in touch" minRows={4} maxRows={10} cols={36} id='message' name="message" aria-label="Message"/>
                </Flex>
                <Flex css={{justifyContent: "center", py: '$8', gap: '$5',}}>
                    <Dropdown >
                        <Dropdown.Button flat>{selectedDropdown}</Dropdown.Button>
                            <Dropdown.Menu aria-label="Static Actions"
                                selectionMode="single" selectedKeys={selectedDropdown}
                                onSelectionChange={setSelectedDropdown}
                            >
                            <Dropdown.Item key="General Feedback">General Feedback</Dropdown.Item>
                            <Dropdown.Item key="Major Bug" color="error">Major Bug</Dropdown.Item>
                            <Dropdown.Item key="Minor Bug">Minor Bug</Dropdown.Item>
                            <Dropdown.Item key="Suggestion">Suggestion</Dropdown.Item>
                        </Dropdown.Menu >
                    </Dropdown>
                </Flex>
                <Flex css={{justifyContent: "center", py: '$8', gap: '$5',}}>
                    <Checkbox label="Urgent" />
                </Flex>
                <Flex css={{justifyContent: "center", py: '$4', gap: '$5',}}>
                    <ReCAPTCHA  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={setCaptcha} />
                </Flex>
                <Flex css={{justifyContent: "center", py: '$8', gap: '$5',}}>
                <Button  size="lg" className={CSS.submit} type="submit" color={sendStatus}>
                    {sendText}
                    {sendStatus === "sending" &&  
                    <Flex>
                        <Spacer  />
                        <Loading size="sm" color={"warning"} /> 
                    </Flex>}
                    {sendStatus === "completed"}
                </Button>
                </Flex>
            </form>
        </Card>
        </Flex>
    </Flex>
</Flex>
</>
);}

export default ContactForm;