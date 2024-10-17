import { Form, Input, Select } from "antd";
import Options from "../options/options";
import TextArea from "antd/es/input/TextArea";
import { ElementType } from "codepedia-types/enums";
import React from "react";
import { IElement } from "codepedia-types/interfaces";

interface Props {
  formData?: IElement,
  setFormData: React.Dispatch<React.SetStateAction<IElement>>
}

export default function ElementForm(props: Props) {  
  const { formData, setFormData } = props;

  const [type, setType] = React.useState<ElementType>(formData?.type ?? ElementType.snippet);
  const [title, setTitle] = React.useState<string>(formData?.title ?? '');
  const [tag, setTag] = React.useState<string>('');
  const [tags, setTags] = React.useState<string[]>(formData?.tags ?? []);
  const [language, setLanguage] = React.useState<string>(formData?.languages[0] ?? '');
  const [code, setCode] = React.useState<string>(formData?.codes[0] ?? '');
  const [link, setLink] = React.useState<string>(formData?.link ?? '');

  React.useEffect(() => {
    const element: IElement = {
      id: formData?.id ?? '',
      title,
      tags,
      languages: [language],
      codes: [code],
      link,
      type
    }

    setFormData(element);
  }, [formData, type, title, tags, language, code, link, setFormData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    setElement: React.Dispatch<React.SetStateAction<string>>,
    elements: string[],
    setElements: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const value = e.target.value;

    setElement(value);

    if (value[value.length-1] == " ") {
      if (value.length === 1) return setElement('');

      const newElements = [...elements, value.substring(0, value.length-1)];
      setElements(newElements);
      setElement('');
    }
  }

  return (
    <Form layout="vertical">
      <Form.Item>
        <Select
          value={type}
          style={{ width: 120 }}
          onChange={(value: ElementType) => setType(value)}
          options={Object.values(ElementType).map((type: string) => ({
            value: type,
            label: type
          }))}
        />
      </Form.Item>
      <Form.Item label="Title">
        <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
        </Form.Item>
      <Form.Item label="Tag">
        <Input value={tag} onChange={(e) => handleInputChange(e, setTag, tags, setTags)}></Input>
      </Form.Item>
      <Options options={tags} setOptions={setTags}></Options>
      <Form.Item label="Language">
        <Input value={language} onChange={(e) => setLanguage(e.target.value)}></Input>
      </Form.Item>
      <Form.Item label="Code">
        <TextArea autoSize value={code} onChange={(e) => setCode(e.target.value)}></TextArea>
      </Form.Item>
      { type === ElementType.solution && <Form.Item label="Link">
        <Input value={link} onChange={(e) => setLink(e.target.value)}></Input>
      </Form.Item> }
    </Form>
  )
}