import { Button, Modal } from "antd";
import React from "react";
import { IElement } from "codepedia-types/interfaces";
import { deleteElement } from "@/services/element";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  element: IElement;
  setElements: React.Dispatch<React.SetStateAction<IElement[]>>;
}

export default function EditElementModal(props: Props) {
  const { element, setElements, isModalOpen, setIsModalOpen } = props;

  const handleSubmit = () => {
    setIsModalOpen(false);

    deleteElement(element).then((elements: IElement[]) => setElements(elements));
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