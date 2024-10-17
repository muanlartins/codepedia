import { CloseOutlined } from "@ant-design/icons";
import styles from "./options.module.scss";
import React from "react";

export default function Options(props: any) {
  const { options, setOptions } = props;

  const removeOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);

    setOptions(newOptions);
  }

  return (
    options && options.length > 0 && <div className={styles.options}>
      { options.map((option: string, index: number) => (
        <div key={option} className={styles.options__option}>
          <div className={styles.options__option__text}>{option}</div>
          <CloseOutlined onClick={() => removeOption(index)} className={styles.options__option__image} />
        </div>
      )) }
    </div>
  )
}