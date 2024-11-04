'use client';

import Search from "antd/es/input/Search";
import styles from "./page.module.scss";
import Image from "next/image";
import Code from "@/components/code/code";
import React from "react";
import { classIf } from "@/utils/class-if";
import { FloatButton, Select } from "antd";
import { ElementType }  from "codepedia-types/enums";
import { Element }  from "codepedia-types/interfaces";
import { PlusOutlined } from "@ant-design/icons";
import AddElementModal from "@/components/add-element-modal/add-element-modal";
import { getElements } from "@/services/element";
import Password from "antd/es/input/Password";
import { getItem, setItem } from "@/utils/local-storage";

export default function Home() {
  const [elements, setElements] = React.useState<Element[]>([]);
  const [filteredElements, setFilteredElements] = React.useState<Element[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [columns, setColumns] = React.useState<string>("");
  const [option, setOption] = React.useState<ElementType>(ElementType.snippet);
  const [password, setPassword] = React.useState<string>("");

  const [isAddElementModalOpen, setIsAddElementModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    getElements().then((data) => {
      setElements(data);
    });
  }, []);

  React.useEffect(() => {
    const columns = getItem('columns');
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
    setItem('columns', value);
  }

  React.useEffect(() => {
    const password = getItem('password');
    if (password)
      setPassword(password);
  }, [password]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setPassword(value);
    setItem('password', value);
  }

  return (
    <div className={styles.page}>
      <FloatButton icon={<PlusOutlined />} onClick={() => setIsAddElementModalOpen(true)} />
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
          onChange={(e) => setSearch(e.target.value) }
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
        <Password
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
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
      <div style={{columns: `${columns}`}} className={styles.page__elements}>
        { filteredElements.map((element: Element) => <Code
            key={element.id}
            element={element}
            setElements={setElements}
          ></Code>) }
      </div>
      <AddElementModal 
        initialFormData={{
          type: option
        } as Element}
        setElements={setElements}
        isModalOpen={isAddElementModalOpen} 
        setIsModalOpen={setIsAddElementModalOpen} 
      ></AddElementModal>
    </div>
  );
}
