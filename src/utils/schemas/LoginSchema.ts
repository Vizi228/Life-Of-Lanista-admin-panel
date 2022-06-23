import { Schema } from "rsuite";

export const loginModel = Schema.Model({
    name: Schema.Types.StringType().minLength(4, 'Login must contains minimum 4 symbols').isRequired('This field is required'),
    password: Schema.Types.StringType().minLength(8, 'Password must contains minimum 8 symbols').isRequired('This field is required'),
});