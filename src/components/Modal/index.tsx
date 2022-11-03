import ReactDOM from 'react-dom';
import { useModalContext } from '../../contexts/ModalContext';
import S from "./styles.module.scss";

export function Modal() {
    const { isModalOpen, modalContent, handleModal } = useModalContext();

    const handleClick = () => handleModal();

    const component = (
        <div className={S.background}>
            <div className={S.container}>
                <p>
                    {modalContent}
                </p>
                <button onClick={handleClick}>
                    Fechar
                </button>
            </div>
        </div>
    );

    if (isModalOpen)
        return ReactDOM.createPortal(
            component,
            document.getElementById("modal-root") as HTMLElement
        )
    else
        return null;
};