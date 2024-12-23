import type { PageServerLoad, Actions } from "./$types.js";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { citationFormSchema } from "$lib/schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ url }) => {
  let params = url.searchParams.get("citations");
  let citations = params ? JSON.parse(decodeURI(params)) : [];
  return {
    citations,
    form: await superValidate(zod(citationFormSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(citationFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    // get current cit list
    let params = event.url.searchParams.get("citations");
    let citations = params ? JSON.parse(params) : [];
    citations.push(JSON.parse(JSON.stringify(form)));
    redirect(303, "/?citations=" + JSON.stringify(citations));

    return {
      form: form,
    };
  },
};
