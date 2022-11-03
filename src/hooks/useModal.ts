import { useState } from "react";

export function useModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const handleModal = (content = "") => {
        setIsModalOpen(!isModalOpen);
        if (content) setModalContent(content);
    };

    return {
        isModalOpen,
        modalContent,
        handleModal
    };
};