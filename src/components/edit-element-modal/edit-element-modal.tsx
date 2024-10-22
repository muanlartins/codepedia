import { Button, Modal } from "antd";
import React from "react";
import ElementForm from "../element-form/element-form";
import { editElement } from "@/services/element";
import { Element }  from "codepedia-types/interfaces";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  element: Element;
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
}

export default function EditElementModal(props: Props) {
  const { element, setElements, isModalOpen, setIsModalOpen } = props;
  
  const [formData, setFormData] = React.useState<Element>(element);

  const handleSubmit = () => {
    setIsModalOpen(false);

    editElement(formData).then((elements: Element[]) => setElements(elements));
  }

  return (
    <Modal 
      title="Edit Element" 
      open={isModalOpen} 
      onOk={() => setIsModalOpen(false)} 
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" htmlType="submit" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <ElementForm formData={formData} setFormData={setFormData}></ElementForm>
    </Modal>
  )
}