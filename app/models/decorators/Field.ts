import type Model from "../base/Model";

const fields = new Map<string, (string | number | symbol)[]>();

/**
 * Returns the keys recorded as serializable fields on a model.
 *
 * @param target the model to inspect.
 * @returns the keys decorated with @Field.
 */
export const getFieldsForModel = <T extends Model>(target: T) =>
  getFieldsForModelClass(target.constructor as typeof Model);

/**
 * Returns the keys recorded as serializable fields on a model class.
 *
 * @param model the model class to inspect.
 * @returns the keys decorated with @Field.
 */
export function getFieldsForModelClass(model: { modelName: string }) {
  // Keyed by modelName rather than the constructor name, which is not
  // unique once class names are minified in production builds.
  return fields.get(model.modelName) ?? [];
}

/**
 * A decorator that records this key as a serializable field on the model.
 * Properties decorated with @Field will be included in API requests by default.
 *
 * @param target the model the property is defined on.
 * @param propertyKey the key to record as a field.
 */
const Field = (target: Model, propertyKey: string | symbol) => {
  const className = (target.constructor as typeof Model).modelName;
  fields.set(className, [...(fields.get(className) ?? []), propertyKey]);
};

export default Field;
