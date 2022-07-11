<template>
  <div class="col-12 d-flex justify-content-center pt-4 text-white foter">
      <footer class="link">
        &copy; copyritgh 2022
         <b-icon class="icon" icon="" />
        <a class="link fb" href="#" target="_blank"> <b-icon icon="facebook"/></a>
        <a class="link tw" href="#" target="_blank"><b-icon icon="twitter"/></a>
        <a class="link yt" href="#" target="_blank"><b-icon icon="youtube"/></a>
        <a class="link slack" href="#" target="_blank"><b-icon icon="slack"/></a>
        <a class="link ws" href="#" target="_blank"><b-icon icon="whatsapp"/></a>
      </footer>
    </div>
</template>

<style>
.foter {
    height: 100px;
    background-color: rgb(20, 20, 20);
}
.link {
    cursor: pointer;
    font-size: 17px;
    color: gray;
    text-decoration: none;
    margin-right: 5px;
  }

  .fb:hover {
    color: #3b5998;
  }

  .yt:hover {
    color: #c4302b;
  }

  .ws:hover {
    color: #075e54;

  }

  .tw:hover {
    color: #00acee;
  }

  .slack:hover {
    color: rgb(46, 182, 125);
  }

</style>