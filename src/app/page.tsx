'use client';

import Search from "antd/es/input/Search";
import styles from "./page.module.scss";
import Image from "next/image";
import Code from "@/components/code/code";
import { IElement } from "@/interfaces/code";
import { SNIPPETS } from "@/constants/snippets";
import { SOLUTIONS } from "@/constants/solutions";
import React from "react";
import { classIf } from "@/utils/classIf";
import { Select } from "antd";

enum SwitchOption {
  snippet = 'SNIPPET',
  solution = 'SOLUTION'
}

function getOption(option: SwitchOption) {
  switch(option) {
    case SwitchOption.snippet:
      return SNIPPETS;
    case SwitchOption.solution:
      return SOLUTIONS;
  }
}

export default function Home() {
  const [elements, setElements] = React.useState<IElement[]>([]);
  const [search, setSearch] = React.useState<string>('');
  const [columns, setColumns] = React.useState<string>();
  const [languageIndex, setLanguageIndex] = React.useState(0);
  const [option, setOption] = React.useState<SwitchOption>(SwitchOption.snippet);

  React.useEffect(() => {
    setElements(getOption(option));
  }, [option]);

  React.useEffect(() => {
    const columns = localStorage.getItem('columns');
    if (columns)
      setColumns(columns);
  }, []);

  React.useEffect(() => {
    if (search) {
      setElements(getOption(option).filter((code: any) => {
        return code.title.toLowerCase().includes(search.toLowerCase()) || 
          code.tags.map((tag: string) => tag.toLowerCase()).reduce(
            (prev: boolean, curr: string) => prev || curr.includes(search.toLowerCase()), false
          ) 
      }));
    } else setElements(getOption(option));
  }, [elements, search, option]);

  const handleColumnsChange = (value: string) => {
    setColumns(value);
    localStorage.setItem('columns', value);
  }

  return (
    <div className={styles.page}>
      <div className={styles.page__logo}>
        <div className={styles.page__logo__upper}>
          <Image 
            className={styles.page__logo__upper__image} 
            alt="logo" 
            src="/wikipedia.png"
            width={96}
            height={96}
          ></Image>
          <div className={styles.page__logo__upper__text}>CodepediA</div>
        </div>
        <div className={styles.page__logo__lower}>
          An archive to save me the search effort.
        </div>
      </div>
      <div className={styles.page__search}>
        <Search 
          className={styles.page__search__input} 
          placeholder="Search for code" 
          allowClear 
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
        />
        <Select
          value={columns}
          style={{ width: 120 }}
          onChange={handleColumnsChange}
          options={[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
          ]}
        />
      </div>
      <div className={styles.page__switch}>
        <div 
          className={`
            ${styles.page__switch__option} 
            ${classIf(styles['page__switch__option--active'], option === SwitchOption.snippet)}
          `} 
          onClick={() => setOption(SwitchOption.snippet)}
        >Snippets</div>
        <div 
          className={`
            ${styles.page__switch__option}
            ${classIf(styles['page__switch__option--active'], option === SwitchOption.solution)}
          `} 
          onClick={() => setOption(SwitchOption.solution)}
        >Solutions</div>
      </div>
      <div style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}} className={styles.page__elements}>
        { elements.map((element: IElement, index: any) => <Code
            key={index}
            element={element}
            languageIndex={languageIndex}
            setLanguageIndex={setLanguageIndex}
          ></Code>) }
      </div>
    </div>
  );
}
