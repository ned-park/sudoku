# Sudoku

## Description

A visually minimalist sudoku app that features on demand puzzle generation and
automatic saving and retrieving of games in progress to and from localStorage.

See it live [https://sudoku-by-ned.netlify.app](https://sudoku-by-ned.netlify.app).

## Tech

React, Vite, Web Workers, CSS

## What I learned

The most significant thing I learned in this project was how to integrate Web
Workers to run computationally intensive tasks in the background to avoid
interface lag for users. In this case that was generating the puzzles.

## What I'd change

In order to avoid a lot of nested maps I implemented the board as a 1D array.  
While that worked pretty well, some of the arithmetic to determine which of
the sub-blocks of 9 squares a 1D array index belonged to was more involved
than I initially figured it would be.
