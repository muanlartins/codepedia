'use client';

import { BASE_URL } from "@/constants/baseUrl";
import { getItem } from "@/utils/localStorage";
import { Element }  from "codepedia-types/interfaces";

const headers = {
  "Content-Type": "application/json",
  "Authorization": getItem('password')!
}

export function getElements() {
  return fetch(`${BASE_URL}/`, {
    method: 'get',
    headers,
  }).then((data) => data.json() as Promise<Element[]>);
}

export function addElement(element: Element) {
  return fetch(`${BASE_URL}/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(element)
  }).then(() => getElements());
}

export function editElement(element: Element) {
  return fetch(`${BASE_URL}/`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(element)
  }).then(() => getElements());
}

export function deleteElement(element: Element) {
  return fetch(`${BASE_URL}/`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(element)
  }).then(() => getElements());
}