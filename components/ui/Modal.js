import Card from './Card';
import CSS from './Modal.module.css';

function Modal(props) {
    const {backdrop, onRemove, onDecline, onAccept, children, title}  = props;

    function backdropClicked(){
        if(onRemove)
        {
            onRemove();
        }
    }
    function declineClicked(){
        if(onDecline)
        {
            onDecline();
        }
        else if(onRemove)
        {
            onRemove();
        }
    }
    function acceptClicked(){
        if(onAccept)
        {
            onAccept();
        }
        else if(onRemove)
        {
            onRemove();
        }
    }


    return(
<div>
{backdrop && <div className={CSS.backdrop} onClick={backdropClicked}></div>}
    <Card className={CSS.modal}>
        <div className={CSS.title}>
            <h1>{title}</h1>
        </div>
            <div className={CSS.content}>
                {children}
            </div>
        <button onClick={acceptClicked}>{onAccept ? "Accept" : "Close"}</button>
        {onAccept && <button onClick={declineClicked}>{onDecline ? "Decline" : "Close"}</button>}
        <div className={CSS.status}></div>
    </Card>
</div>
);}

export default Modal;
