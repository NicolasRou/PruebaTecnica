<template>
  <div class="home">
    <div class="poster">
      <img src="https://images6.alphacoders.com/909/909641.png" alt="rick and morty">
    </div>
    <div>
      <p>¡Explora todos los personajes!</p>
        <router-link to="/character">
          <button>Ver personajes</button>
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
.poster {
 width: 100%;
}
.poster img {
  max-width: 800px;
  margin: auto;
}
</style>