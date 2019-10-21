---
to: src/service/<%=h.changeCase.lower(h.inflection.pluralize(modelName))%>/<%=h.inflection.capitalize(h.inflection.singularize(modelName))%>.model.ts
---
<%
models =  h.changeCase.lower(h.inflection.pluralize(modelName))
model =  h.changeCase.lower(h.inflection.singularize(modelName))
Model =  h.inflection.capitalize(h.inflection.singularize(modelName))
%>
import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Only Pure Field Available
 *
 * @export
 * @interface I<%=Model%>Fields
 */
export interface I<%=Model%>Fields  {
    name: string;
}

export interface I<%=Model%>Model extends mongoose.Document, I<%=Model%>Fields {}

const <%=Model%>Schema = new Schema({
    name: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

export default mongoose.model<I<%=Model%>Model>('<%=model%>', <%=Model%>Schema, '<%=models%>', true);