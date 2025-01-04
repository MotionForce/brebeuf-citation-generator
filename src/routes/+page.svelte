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
      simple copier coller. Vous pouver aussi simplement copier le lien en cours
      de cette page pour le partager ou y revenir plus tard.
    </p>
    <h4 class="text-lg">
      Cette page est <b>lente</b>. Veuillez s'il vous plait <b>attendre</b> un peu
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
  <footer>
    <p>Bibliothèques et librairies utilisées pour cette application:</p>
    <ul>
      <il>SvelteKit 2 comme framework;</il>
      <il>Shadcn-Svelte et TailwindCSS pour le UI;</il>
      <il
        >zod, formsnap et SvelteKit-Superforms pour la création de form et leur
        validation.</il
      >
    </ul>
    <p>
      Ceci est un projet personnel qui est conçu pour être utilisé uniquement
      dans un contexte éducatif pour faciliter le processus d'écriture d'une
      bibliographie. Ce projet ne doit pas être utilisé pour tricher de quelque
      manière que ce soit. Utilisez à votre risque.
    </p>
  </footer>
</div>
<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
