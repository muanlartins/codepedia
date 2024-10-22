import { Form, Input, Select } from "antd";
import Options from "../options/options";
import TextArea from "antd/es/input/TextArea";
import { ElementType } from "codepedia-types/enums";
import React from "react";
import { Element } from "codepedia-types/interfaces";

interface Props {
  formData?: Element,
  setFormData: React.Dispatch<React.SetStateAction<Element>>
}

export default function ElementForm(props: Props) {  
  const { formData, setFormData } = props;

  const [tag, setTag] = React.useState<string>('');
  const [language, setLanguage] = React.useState<string>(formData?.languages?.[0] || '');
  const [code, setCode] = React.useState<string>(formData?.codes?.[0] || '');

  const handleTagChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setTag(value);

    if (value[value.length-1] == " ") {
      if (value.length === 1) return setTag('');

      const tags = 
        formData?.tags ? 
        [...formData?.tags, value.substring(0, value.length-1)] :
        [value.substring(0, value.length-1)];
      
      setFormData({
        ...formData,
        tags
      } as Element);
      setTag('');
    }
  }

  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setLanguage(value);

    setFormData({
      ...formData,
      languages: [value]
    } as Element);
  }

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;

    setCode(value);

    setFormData({
      ...formData,
      codes: [value]
    } as Element);
  }

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    } as Element);
  }

  return (
    <Form layout="vertical">
      <Form.Item>
        <Select
          value={formData?.type}
          style={{ width: 120 }}
          onChange={(value: ElementType) => handleChange('type', value)}
          options={Object.values(ElementType).map((type: string) => ({
            value: type,
            label: type
          }))}
        />
      </Form.Item>
      <Form.Item label="Title">
        <Input value={formData?.title} onChange={(e) => handleChange('title', e.target.value)}></Input>
        </Form.Item>
      <Form.Item label="Tag">
        <Input value={tag} onChange={handleTagChange}></Input>
      </Form.Item>
      <Options field="tags" formData={formData} setFormData={setFormData}></Options>
      <Form.Item label="Language">
        <Input value={language} onChange={handleLanguageChange}></Input>
      </Form.Item>
      <Form.Item label="Code">
        <TextArea autoSize value={code} onChange={handleCodeChange}></TextArea>
      </Form.Item>
      { formData?.type === ElementType.solution && <Form.Item label="Link">
        <Input value={formData?.link} onChange={(e) => handleChange('link', e.target.value)}></Input>
      </Form.Item> }
    </Form>
  )
}