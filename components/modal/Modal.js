import {useState} from 'react';
import { Modal as ModalUI, Input, Row, Checkbox, Button, Text, Navbar} from '@nextui-org/react';





export const Modal = ({bAccept , title, onClose}) => {
   const [visible, setVisible] = useState(true);
   const handler = () => setVisible(true);
   const closeHandler = () => {
        setVisible(false);
        if(onClose)
        {
            onClose();
        }
   };

   return (
      <div>
         {/* <Navbar.Link onClick={handler}>Login</Navbar.Link> */}
         <ModalUI
            closeButton
            blur
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
         >
            <ModalUI.Header>
               <Text id="modal-title" size={18}>
                  {title}
               </Text>
            </ModalUI.Header>
            <ModalUI.Body>
               {/* <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Email"
                  //   contentLeft={<Mail fill="currentColor" />}
               />
               <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Password"
                  //   contentLeft={<Password fill="currentColor" />}
               /> */}
            </ModalUI.Body>
            <ModalUI.Footer>
               <Button auto flat color="error" onClick={closeHandler}>
                  Close
               </Button>
               {bAccept && 
                <Button auto onClick={closeHandler}>
                    Accept
                </Button>               
               }
            </ModalUI.Footer>
         </ModalUI>
      </div>
   );
};
