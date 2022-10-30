<template>
  <header class="header">
    <router-link to="/">
        <h1>Rick and Morty</h1>
    </router-link>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<style>
* {
  margin: 0 50px;
  padding: 0%;
  box-sizing: border-box;
  background-color: #f7f7f7;
  text-align: center;
  text-decoration: none;

}
.header, .header h1 {
  background-color: black;
  color: white;
}

</style>
