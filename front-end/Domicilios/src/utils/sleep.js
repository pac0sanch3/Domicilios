export async function slepp(number) {
  return new Promise((resolve) => setTimeout(resolve, number));
}
