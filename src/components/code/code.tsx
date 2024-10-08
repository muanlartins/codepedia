
'use client';

import styles from "./code.module.scss";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import javascript from 'highlight.js/lib/languages/javascript';
import React from "react";
hljs.registerLanguage('javascript', javascript);

export default function Code(props: any) {
  const { title, tags, languages, codes, languageIndex, setLanguageIndex } = props;

  return (
    <div className={ styles.block }>
      <div className={ styles.block__title }>
        { title }
        { tags.map((tag: any, index: number) => 
          <span key={index} className={ styles.block__title__tag }>{ tag }</span>) 
        }
      </div>
      <div className={ styles.block__languages }>
        { languages.map((language: any, index: number) => 
          <span 
            key={index} 
            className={` 
              ${styles.block__languages__language} 
              ${index === languageIndex && styles['block__languages__language--active']}
            `}
            onClick={ () => setLanguageIndex(index) }
          >{ language }</span>) 
        }
      </div>
      <pre className={ styles.block__code }>
        <code dangerouslySetInnerHTML={{ __html: hljs.highlight(codes[languageIndex], { language: languages[languageIndex] }).value }}>
        </code>
      </pre>
    </div>
  )
}