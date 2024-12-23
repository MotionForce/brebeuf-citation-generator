<!-- TODO: i18n (en/fr) -->

<script lang="ts">
  import CalendarIcon from "lucide-svelte/icons/calendar";
  import {
    CalendarDate,
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
    parseDate,
    today,
  } from "@internationalized/date";
  import * as Form from "$lib/components/ui/form";
  import * as Select from "$lib/components/ui/select";
  import { Input } from "$lib/components/ui/input";
  import {
    citationFormSchema,
    source_types,
    type CitationFormSchema,
  } from "$lib/schema";
  import SuperDebug, {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { toast } from "svelte-sonner";
  // import { browser, dev } from "$app/environment";
  import { cn } from "$lib/utils.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";

  export let data: SuperValidated<Infer<CitationFormSchema>>;

  const form = superForm(data, {
    validators: zodClient(citationFormSchema),
    dataType: "json",
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
      } else {
        toast.error("Please fix the errors in the form.");
      }
    },
  });

  const { form: formData, enhance } = form;

  const df = new DateFormatter("en-CA", {
    dateStyle: "long",
  });

  let dateValue: DateValue | undefined;
  $: dateValue = $formData.citationFormSchemaOptions.accessed_on
    ? parseDate($formData.citationFormSchemaOptions.accessed_on)
    : undefined;
  let placeholder: DateValue = today(getLocalTimeZone());

  $: selectedSourceType = $formData.citationFormSchemaOptions.source_type
    ? {
        label: $formData.citationFormSchemaOptions.source_type,
        value: $formData.citationFormSchemaOptions.source_type,
      }
    : undefined;
</script>

<div class="flex flex-col space-y-5 p-6">
  <form method="POST" use:enhance>
    <div class="flex flex-row space-x-3 w-full flex-grow">
      <!-- Source type -->
      <div class="flex-nonee min-w-24">
        <Form.Field {form} name="citationFormSchemaOptions.source_type">
          <Form.Control let:attrs>
            <Form.Label>Type de source</Form.Label>
            <Select.Root
              selected={selectedSourceType}
              onSelectedChange={(v) => {
                v &&
                  ($formData.citationFormSchemaOptions.source_type = v.value);
              }}
            >
              <Select.Input name={attrs.name} />
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select a source type" />
              </Select.Trigger>
              <Select.Content>
                {#each Object.entries(source_types) as [value, label]}
                  <Select.Item {value}
                    >{label === "Livre" ? "Livre" : "Web"}</Select.Item
                  >
                {/each}
              </Select.Content>
            </Select.Root>
            <input
              hidden
              bind:value={$formData.citationFormSchemaOptions.source_type}
              name={attrs.name}
            />
          </Form.Control>
        </Form.Field>
      </div>
      <!-- Title -->
      <div class="grow">
        <Form.Field {form} name="title">
          <Form.Control let:attrs>
            <Form.Label>Titre</Form.Label>
            <Input {...attrs} bind:value={$formData.title} />
          </Form.Control>
          <Form.Description hidden
            >Ceci est le titre de la source</Form.Description
          >
          <Form.FieldErrors></Form.FieldErrors>
        </Form.Field>
      </div>
    </div>
    <!-- Author first name -->
    <div class="flex flex-row space-x-3">
      <div class="grow">
        <Form.Field {form} name="author">
          <Form.Control let:attrs>
            <Form.Label>Auteur (prénom)</Form.Label>
            <Input {...attrs} bind:value={$formData.author.first_name} />
          </Form.Control>
          <Form.Description hidden
            >Ceci est le nom de famille de l'auteur</Form.Description
          >
          <Form.FieldErrors></Form.FieldErrors>
        </Form.Field>
      </div>
      <!-- Author last name -->
      <div class="grow">
        <Form.Field {form} name="author">
          <Form.Control let:attrs>
            <Form.Label>Auteur (nom de famille)</Form.Label>
            <Input {...attrs} bind:value={$formData.author.last_name} />
          </Form.Control>
          <Form.Description hidden
            >Ceci est le nom de famille de l'auteur</Form.Description
          >
          <Form.FieldErrors></Form.FieldErrors>
        </Form.Field>
      </div>
    </div>
    <!-- Book fields -->
    {#if $formData.citationFormSchemaOptions.source_type === "livre"}
      <!-- Publisher -->
      <div class="grow">
        <Form.Field {form} name="citationFormSchemaOptions.publisher">
          <Form.Control let:attrs>
            <Form.Label>Éditions</Form.Label>
            <Input
              {...attrs}
              bind:value={$formData.citationFormSchemaOptions.publisher}
            />
          </Form.Control>
          <Form.Description hidden
            >Ceci est la maison d'édition de la source</Form.Description
          >
          <Form.FieldErrors></Form.FieldErrors>
        </Form.Field>
      </div>
      <!-- Collection -->
      <div class="grow">
        <Form.Field {form} name="citationFormSchemaOptions.collection">
          <Form.Control let:attrs>
            <Form.Label>Collection</Form.Label>
            <Input
              {...attrs}
              bind:value={$formData.citationFormSchemaOptions.collection}
            />
          </Form.Control>
          <Form.Description hidden
            >Ceci est la collection de la source</Form.Description
          >
          <Form.FieldErrors></Form.FieldErrors>
        </Form.Field>
      </div>
      <!-- Year -->
      <div class="grow">
        <Form.Field {form} name="citationFormSchemaOptions.year">
          <Form.Control let:attrs>
            <Form.Label>Année</Form.Label>
            <Input
              {...attrs}
              bind:value={$formData.citationFormSchemaOptions.year}
            />
          </Form.Control>
          <Form.Description hidden
            >Ceci est l'année la source a été publiée</Form.Description
          >
          <Form.FieldErrors></Form.FieldErrors>
        </Form.Field>
      </div>
      <!-- Page -->
      <div class="grow">
        <Form.Field {form} name="citationFormSchemaOptions.page">
          <Form.Control let:attrs>
            <Form.Label>Page</Form.Label>
            <Input
              {...attrs}
              bind:value={$formData.citationFormSchemaOptions.page}
            />
          </Form.Control>
          <Form.Description hidden
            >La page à laquelle la source réfère</Form.Description
          >
          <Form.FieldErrors></Form.FieldErrors>
        </Form.Field>
      </div>

      <!-- Web fields -->
    {:else}
      <!-- Website name -->
      <div class="grow">
        <Form.Field {form} name="citationFormSchemaOptions.name">
          <Form.Control let:attrs>
            <Form.Label>Nom du site</Form.Label>
            <Input
              {...attrs}
              bind:value={$formData.citationFormSchemaOptions.name}
            />
          </Form.Control>
          <Form.Description hidden>Le nom du siteweb</Form.Description>
          <Form.FieldErrors></Form.FieldErrors>
        </Form.Field>
      </div>
      <!-- URL -->
      <div class="grow">
        <Form.Field {form} name="citationFormSchemaOptions.url">
          <Form.Control let:attrs>
            <Form.Label>URL</Form.Label>
            <Input
              {...attrs}
              bind:value={$formData.citationFormSchemaOptions.url}
            />
          </Form.Control>
          <Form.Description hidden>Le lien URL vers la source</Form.Description>
          <Form.FieldErrors></Form.FieldErrors>
        </Form.Field>
      </div>
      <!-- Accesed on -->
      <div class="grow">
        <Form.Field
          {form}
          name="citationFormSchemaOptions.accessed_on"
          class="flex flex-col"
        >
          <Form.Control let:attrs>
            <Form.Label>Date de consultation</Form.Label>
            <Popover.Root>
              <Popover.Trigger
                {...attrs}
                class={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-[280px] justify-start pl-4 text-left font-normal",
                  !dateValue && "text-muted-foreground",
                )}
              >
                {dateValue
                  ? df.format(dateValue.toDate(getLocalTimeZone()))
                  : "Pick a date"}
                <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
              </Popover.Trigger>
              <Popover.Content class="w-auto p-0" side="top">
                <Calendar
                  value={dateValue}
                  bind:placeholder
                  minValue={new CalendarDate(1900, 1, 1)}
                  maxValue={today(getLocalTimeZone())}
                  calendarLabel="Date accesed on"
                  initialFocus
                  onValueChange={(v) => {
                    if (v) {
                      $formData.citationFormSchemaOptions.accessed_on =
                        v.toString();
                    } else {
                      $formData.citationFormSchemaOptions.accessed_on = "";
                    }
                  }}
                />
              </Popover.Content>
            </Popover.Root>
            <Form.Description hidden
              >La date à laquelle la source a été consultatée</Form.Description
            >
            <Form.FieldErrors />
            <input
              hidden
              value={$formData.citationFormSchemaOptions.accessed_on}
              name={attrs.name}
            />
          </Form.Control>
        </Form.Field>
      </div>
    {/if}
    <!-- <Form.FormFieldErrors /> -->
    <Button type="submit">Ajouter</Button>
    <!-- {#if browser && dev}
      <SuperDebug data={$formData} />
    {/if} -->
  </form>
</div>
