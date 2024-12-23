<script lang="ts">
  import { formatCitation } from "$lib/types";
  import { Button } from "$lib/components/ui/button";
  //   import { dev } from "$app/environment";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { redirect } from "@sveltejs/kit";
  export let citations: string[] = [];

  let citation_list = "";
  let ordered_citations = "";
  $: for (let citation of citations) {
    citation_list += `${formatCitation(citation)}<br>`;
  }
  $: ordered_citations = citation_list.split("<br>").sort().join("<br>");

  async function copyToClipboard() {
    try {
      const blob = new Blob([ordered_citations], { type: "text/html" });
      const clipboardItem = new ClipboardItem({ "text/html": blob });
      await navigator.clipboard.write([clipboardItem]);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert(
        "Erreur de copie du texte. Le voici cependant (si c'est vide, veuillez réessayer ou contacter le développeur): \n\n" +
          ordered_citations,
      );
    }
  }
</script>

<div class="flex flex-col space-y-5">
  <div class="flex flex-row space-x-5 mt-3 items-center">
    <h2 class="text-2xl font-bold">Citations</h2>
    {#if citations.length > 0}
      <Button variant="default" on:click={copyToClipboard}
        >Copier les citations</Button
      >
    {/if}
  </div>
  {#if citations.length > 0}
    <ul class="list-disc list-inside">
      {#each ordered_citations.split("<br>") as citation}
        {#if citation}
          <li>{@html citation}</li>
        {/if}
      {/each}
    </ul>
  {:else}
    <p>
      Aucune citation n'a été ajoutée. S'il vous plait utiliser le menu de
      gauche pour le faire.
    </p>
  {/if}

  <AlertDialog.Root>
    <AlertDialog.Trigger asChild let:builder>
      <Button builders={[builder]} variant="destructive">Effacer tout</Button>
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title
          >Est-ce que vous êtes sûr que vous voulez tout effacer?</AlertDialog.Title
        >
        <AlertDialog.Description>
          Vous êtes sur le point d'effacer toute vos sources. Vous allez les
          perdre si vous continuer. S'il vous plait sauvegarder le lien actuel
          pour pouvoir y revenir plus tard.<br /><b
            >Vous pouvez toujours revenir en arrière ou regarder dans votre
            historique de recherche.</b
          >
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Annuler</AlertDialog.Cancel>
        <AlertDialog.Action asChild let:builder>
          <Button builders={[builder]} variant="destructive" href="/"
            >Continuer</Button
          >
        </AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
</div>
