import { createContext, useContext } from "react";
import { Modal } from "../components/Modal";
import { useModal } from "../hooks/useModal";

interface IModalContext {
    isModalOpen: boolean;
    modalContent: string;
    handleModal: (modalContent?: string) => void;
};

export const ModalContext = createContext({} as IModalContext);

export function ModalProvider(
    { children }: { children: React.ReactNode }
) {
    const { isModalOpen, modalContent, handleModal } = useModal();

    return (
        <ModalContext.Provider value={{
            isModalOpen,
            modalContent,
            handleModal
        }}>
            <Modal />
            {children}
        </ModalContext.Provider>
    );
};

export function useModalContext() {
    const context = useContext(ModalContext);
    return context;
};