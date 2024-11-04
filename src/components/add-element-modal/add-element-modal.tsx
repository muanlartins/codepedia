import { Button, Modal } from "antd";
import React from "react";
import ElementForm, { Handle } from "../element-form/element-form";
import { Element }  from "codepedia-types/interfaces";
import { addElement } from "@/services/element";

interface Props {
  initialFormData?: Element;
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddElementModal(props: Props) {
  const { initialFormData, setElements, isModalOpen, setIsModalOpen } = props;
  
  const [formData, setFormData] = React.useState<Element>({} as Element);

  const elementFormRef = React.createRef<Handle>();

  React.useEffect(() => {
    if (initialFormData)
      setFormData(initialFormData);
  }, [initialFormData]);

  const handleSubmit = () => {
    setIsModalOpen(false);

    addElement(formData).then((elements: Element[]) => setElements(elements));

    elementFormRef.current?.clearForm();
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
      <ElementForm ref={elementFormRef} formData={formData} setFormData={setFormData}></ElementForm>
    </Modal>
  )
}