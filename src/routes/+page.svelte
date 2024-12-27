<script lang="ts">
  import type { PageData } from "./$types";
  import Form from "$lib/form.svelte";
  import Citations from "$lib/components/ui/citations.svelte";

  export let data: PageData;
</script>

<div class="flex flex-col space-y-5 m-12 rounded-lg bg-slate-100 p-5">
  <div class="flex flex-col space-y-2">
    <h1 class="text-3xl font-bold">La génératrice de citation à la Brébeuf!</h1>
    <p>
      Pour l'utiliser, veuillez remplir les champs à gauche. Vous pouvez aussi
      copier les citations dans Word, gardant la mise en page, en faisant un
      simple copier coller. Vous pouver aussi simplement copier le lien en cours de cette page pour le partager ou y revenir plus tard.
    </p>
    <h4 class="text-lg">
      Cette page est <b>lente</b>. Très lente. Veuillez s'il vous plait <b>attendre</b> un peu
      avant d'obtenir une mise à jour des citations (quelques secondes devraient
      suffire, mais cela pourrait durer jusqu'à 10-15 secondes).
    </h4>
  </div>
  <div class="w-full border-slate-600 border-y-4 align-center"></div>
  <div class="flex flex-row space-x-5">
    <div class="w-[50%]">
      <Form data={data.form} />
    </div>
    <div class="h-screen border-slate-600 border-x-4 self-center"></div>
    {#key data.citations}
      <div class="w-[50%]">
        <Citations citations={data.citations} />
      </div>
    {/key}
  </div>
</div>
<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
