import { deleteAsync } from "del";

export const cleanBuild = async () => await deleteAsync("build");
