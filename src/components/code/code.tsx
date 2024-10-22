
'use client';

import styles from "./code.module.scss";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import javascript from 'highlight.js/lib/languages/javascript';
import React from "react";
import EditElementModal from "../edit-element-modal/edit-element-modal";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import DeleteElementModal from "../delete-element-modal/delete-element-modal";
import { Element }  from "codepedia-types/interfaces";
import { ElementType } from "codepedia-types/enums";
hljs.registerLanguage('javascript', javascript);

interface Props {
  element: Element;
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
}

export default function Code(props: Props) {
  const { element, setElements } = props;
  const { title, tags, languages, codes } = element;
  const link = element.type === ElementType.solution ? element.link : undefined;

  const [ isEditElementModalOpen, setIsEditElementModalOpen ] = React.useState<boolean>(false);
  const [ isDeleteElementModalOpen, setIsDeleteElementModalOpen ] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <div className={ styles.block }>
        <div className={ styles.block__header }>
          <div className={ styles.block__header__title }>
            { link ? <a target="_blank" className={ styles.block__header__title__link } href={link}>{ title }</a> : title }
          </div>
          <div className={ styles.block__header__tags }>
            { tags.map((tag: string) => 
              <span key={tag} className={ styles.block__header__tags__tag }>{ tag }</span>) 
            }
          </div>
          <div className={ styles.block__header__actions }>
            <EditOutlined 
              className={ styles.block__header__actions__action } 
              onClick={() => setIsEditElementModalOpen(true)} 
            />
            <CloseOutlined 
              className={ styles.block__header__actions__action } 
              onClick={() => setIsDeleteElementModalOpen(true)} 
            />
          </div>
        </div>
        <div className={ styles.block__languages }>
          { languages.map((language: string) => 
            <span 
              key={language} 
              className={` 
                ${styles.block__languages__language} 
                ${styles['block__languages__language--active']}
              `}
            >{ language }</span>) 
          }
        </div>
        <pre className={ styles.block__code }>
          <code dangerouslySetInnerHTML={{ __html: hljs.highlight(codes[0], { language: languages[0] }).value }}>
          </code>
        </pre>
      </div>
      <EditElementModal 
        isModalOpen={isEditElementModalOpen} 
        setIsModalOpen={setIsEditElementModalOpen}
        element={element}
        setElements={setElements}
      ></EditElementModal>
      <DeleteElementModal 
        isModalOpen={isDeleteElementModalOpen} 
        setIsModalOpen={setIsDeleteElementModalOpen}
        element={element}
        setElements={setElements}
      ></DeleteElementModal>
    </React.Fragment>
  )
}