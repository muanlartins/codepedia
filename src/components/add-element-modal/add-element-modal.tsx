import { Button, Modal } from "antd";
import React from "react";
import { IElement } from "codepedia-types/interfaces";
import ElementForm from "../element-form/element-form";
import { addElement } from "@/services/element";

interface Props {
  setElements: React.Dispatch<React.SetStateAction<IElement[]>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddElementModal(props: Props) {
  const { setElements, isModalOpen, setIsModalOpen } = props;
  
  const [formData, setFormData] = React.useState<IElement>({} as IElement);

  const handleSubmit = () => {
    setIsModalOpen(false);

    addElement(formData).then((elements: IElement[]) => setElements(elements));
  }

  return (
    <Modal 
      title="Add Element" 
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
      <ElementForm setFormData={setFormData}></ElementForm>
    </Modal>
  )
}