'use client';

import Search from "antd/es/input/Search";
import styles from "./page.module.scss";
import Image from "next/image";
import Code from "@/components/code/code";
import { CODES } from "@/constants/codes";
import React from "react";

export default function Home() {
  const [codes, setCodes]: any = React.useState([]);
  const [search, setSearch]: any = React.useState('');
  const [languageIndex, setLanguageIndex]: any = React.useState(0);

  React.useEffect(() => {
    setCodes(CODES);
  }, []);

  React.useEffect(() => {
    if (search) {
      setCodes(codes.filter((code: any) => {
        return code.title.toLowerCase().includes(search.toLowerCase()) || 
          code.tags.map((tag: string) => tag.toLowerCase()).includes(search.toLowerCase())
      }));
    } else setCodes(CODES);
  }, [codes, search]);

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
          The code library to save you <br /> the search effort.
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
      </div>
      <div className={styles.page__codes}>
        { codes.map((code: any, index: any) => <Code
            key={index}
            title={code.title}
            tags={code.tags}
            languages={code.languages}
            codes={code.codes}
            languageIndex={languageIndex}
            setLanguageIndex={setLanguageIndex}
          ></Code>) }
      </div>
    </div>
  );
}
