import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { citationFormSchema } from "$lib/schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(citationFormSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    console.log("default action");
    const form = await superValidate(event, zod(citationFormSchema));
    console.log(form);

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    return {
      form,
    };
  },
};
