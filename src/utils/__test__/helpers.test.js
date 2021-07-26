import React from 'react';
import { capitalize, nextId, formatDate, findDateById } from '../helpers';

describe('capitalize', () => {
  it('returns capitalized 1-word string', () => {
    expect(capitalize("hi")).toBe("Hi");
  } )
  it('returns capitalized multiple-word string', () => {
    expect(capitalize("borsch is a cat")).toBe("Borsch is a cat");
  } )
  it('returns capitalized when already capitalized', () => {
    expect(capitalize("Borsch is a cat")).toBe("Borsch is a cat");
  } )
} )

describe('nextId', () => {
  it('returns 2 with signle object length', () => {
    let objects = [
      {
        id: 1,
        name: "Missy"
      }
    ]
    expect(nextId(objects)).toBe(2);
  })
  it('returns correct id with multiple object length', () => {
    let objects = [
      {
        id: 1,
        name: "Missy"
      },
      {
        id: 2,
        name: "Penny"
      },
      {
        id: 3,
        name: "Borsch"
      }
    ]
    expect(nextId(objects)).toBe(4);
  })
  it('returns 1 for an empty array', () => {
    let objects = []
    expect(nextId(objects)).toBe(1);
  })
})
describe('formatDate', () => {
  it('should format date as DD-MMM-YYYY', () => {
    let date = "2021-07-14";
    expect(formatDate(date)).toEqual("14 Jul 2021");
  })
  it('should return the correct month', () => {
    let date = "2021-07-14";
    expect(formatDate(date).split(" ")[1]).toEqual("Jul");
  })
})

describe('findDateById', () => {
    it('should return correct date', () => {
      let objects = [
        {
          id: 1,
          name: "Papa",
          date: "1956-06-13"
        },
        {
          id: 2,
          name: "Mama",
          date: "1959-04-13"
        },
        {
          id: 3,
          name: "Ana",
          date: "1989-06-15"
        }
      ]
      expect(findDateById(2, objects)).toEqual("13 Apr 1959");
    })
  })