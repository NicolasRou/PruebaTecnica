<template>
  <div class="home">
    <div class="title">
      <h1>¡Explora todos los personajes!</h1>
        <router-link to="/character">
          <button class="character">Ver personajes</button>
        </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
 
}

</script>

<style>
.home {
  text-align: center;
}
.title h1 {
  margin: 100px 0;
}
.character {
  color: #318aac;
  width: 25%;
  font-size: 20px;
  font-weight: 500;
  border-radius: 100px;
  padding: 0.5em 1.2em;
  background: rgba(0,0,0,0);
  border: 2px solid;
  border-color: #bdcc6b;
  transition: all 1s ease;
  position: relative;
  cursor: pointer;
}
.character:hover {
  background: #318aac;
  color: #fff;
}
</style>