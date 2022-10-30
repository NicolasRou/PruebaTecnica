<template>
  <header class="poster">
    <router-link to="/">
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg" alt="rick and morty">
    </router-link>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<style>
* {
  margin: 0 0px;
  padding: 0%;
  box-sizing: border-box;
  background-color: #300909;
  text-align: center;
  text-decoration: none;
  font-family: "roboto";
  color: white;
  justify-content: center;

}
.poster {
 width: 100%;
}
.poster img {
  max-width: 100%;
  margin: auto;
}

</style>
