import { Button, Modal } from "antd";
import React from "react";
import { IElement } from "codepedia-types/interfaces";
import ElementForm from "../element-form/element-form";
import { editElement } from "@/services/element";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  element: IElement;
  setElements: React.Dispatch<React.SetStateAction<IElement[]>>;
}

export default function EditElementModal(props: Props) {
  const { element, setElements, isModalOpen, setIsModalOpen } = props;
  
  const [formData, setFormData] = React.useState<IElement>(element);

  const handleSubmit = () => {
    setIsModalOpen(false);

    editElement(formData).then((elements: IElement[]) => setElements(elements));
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