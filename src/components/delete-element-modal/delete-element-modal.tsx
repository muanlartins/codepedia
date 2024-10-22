import { Button, Modal } from "antd";
import React from "react";
import { deleteElement } from "@/services/element";
import { Element }  from "codepedia-types/interfaces";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  element: Element;
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
}

export default function EditElementModal(props: Props) {
  const { element, setElements, isModalOpen, setIsModalOpen } = props;

  const handleSubmit = () => {
    setIsModalOpen(false);

    deleteElement(element).then((elements: Element[]) => setElements(elements));
  }

  return (
    <Modal 
      title="Delete Element" 
      open={isModalOpen} 
      onOk={() => setIsModalOpen(false)} 
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsModalOpen(false)}>
          No
        </Button>,
        <Button key="submit" type="primary" htmlType="submit" onClick={handleSubmit}>
          Yes
        </Button>,
      ]}
    >
      Are you sure you want to delete this element?      
    </Modal>
  )
}