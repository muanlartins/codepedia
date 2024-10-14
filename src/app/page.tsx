'use client';

import Search from "antd/es/input/Search";
import styles from "./page.module.scss";
import Image from "next/image";
import Code from "@/components/code/code";
import React from "react";
import { classIf } from "@/utils/classIf";
import { Select } from "antd";
import { BASE_URL } from "@/constants/baseUrl";
import { IElement }  from "codepedia-types/interfaces";
import { ElementType }  from "codepedia-types/enums";

export default function Home() {
  const [elements, setElements] = React.useState<IElement[]>([]);
  const [filteredElements, setFilteredElements] = React.useState<IElement[]>([]);
  const [search, setSearch] = React.useState<string>('');
  const [columns, setColumns] = React.useState<string>();
  const [languageIndex, setLanguageIndex] = React.useState(0);
  const [option, setOption] = React.useState<ElementType>(ElementType.snippet);

  React.useEffect(() => {
    fetch(`${BASE_URL}/`, {
      method: 'get'
    }).then((data) => data.json()).then((data) => {
      setElements(data);
      setFilteredElements(data);
    });

  }, []);

  React.useEffect(() => {
    const columns = localStorage.getItem('columns');
    if (columns)
      setColumns(columns);
  }, [columns]);

  React.useEffect(() => {
    function filterElements(option: ElementType, search: string) {
      if (!search) return setFilteredElements(elements.filter((element) => element.type === option));

      return setFilteredElements(elements.filter((element) => 
        element.type === option && (
          element.title.toLowerCase().includes(search.toLowerCase()) || 
          element.tags.map((tag: string) => tag.toLowerCase()).reduce(
            (prev: boolean, curr: string) => prev || curr.includes(search.toLowerCase()), false
          ) 
        )
      ))
    }

    filterElements(option, search);
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
            ${classIf(styles['page__switch__option--active'], option === ElementType.snippet)}
          `} 
          onClick={() => setOption(ElementType.snippet)}
        >Snippets</div>
        <div 
          className={`
            ${styles.page__switch__option}
            ${classIf(styles['page__switch__option--active'], option === ElementType.solution)}
          `} 
          onClick={() => setOption(ElementType.solution)}
        >Solutions</div>
      </div>
      <div style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}} className={styles.page__elements}>
        { filteredElements.map((element: IElement, index: any) => <Code
            key={index}
            element={element}
            languageIndex={languageIndex}
            setLanguageIndex={setLanguageIndex}
          ></Code>) }
      </div>
    </div>
  );
}
