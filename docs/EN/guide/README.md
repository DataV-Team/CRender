---
sidebarDepth: 2
---

# Introduction

The plugin renders graphics based on **Canvas**, which is easy to use and easy to use. Built-in richer basic graphics can greatly improve development efficiency, and on this basis, you can easily expand new graphics.

<show-animation />

Click to **replay**.

<fold-box title="Click to expand or collapse">
<<< @/docs/.vuepress/components/showAnimation.vue
</fold-box>

## Characteristics

- Dynamic

Based on the **transition** plugin provides dynamic effect support, call the graphical instance's **animation** method to change its state, **CRender** will automatically render the graphics state transition animation, animation —— So easy.

[Transition](http://transition.jiaminghi.com/)

- Interaction

The built-in basic graphics provide support for functions such as **drag**, **mouseEnter**, **mouseOut**, **click**, and events.

## Install

- Install with npm

```sh
npm install @jiaminghi/c-render
```

- Install with yarn

```sh
yarn add @jiaminghi/c-render
```

### Quick experience

```html
<!--Resources are located on personal servers for experience and testing only, do not use in production environments-->
<!--Debug version-->
<script src="https://unpkg.com/@jiaminghi/c-render@0.4.3/dist/crender.map.js"></script>
<!--Compression version-->
<!-- <script src="https://unpkg.com/@jiaminghi/c-render@0.4.3/dist/crender.min.js"></script> -->
<script>
  const { CRender, extendNewGraph } = window.CRender
  // do something
</script>
```

## Extend

To extend the new graphics for **CRender** see [Extend](/EN/extend/#extend)
