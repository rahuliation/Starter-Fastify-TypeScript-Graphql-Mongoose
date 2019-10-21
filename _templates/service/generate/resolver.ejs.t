---
to: src/service/<%=h.changeCase.lower(h.inflection.pluralize(modelName))%>/<%=h.inflection.capitalize(h.inflection.singularize(modelName))%>.resolver.ts
---
<%
models =  h.changeCase.lower(h.inflection.pluralize(modelName))
model =  h.changeCase.lower(h.inflection.singularize(modelName))
Model =  h.inflection.capitalize(h.inflection.singularize(modelName))
%>
import <%=Model%>Model, { I<%=Model%>Model, I<%=Model%>Fields } from './<%=Model%>.model'
import getDefaultResolver from '../../lib/getDefaultResolver'

const <%=Model%>Resolver = getDefaultResolver<I<%=Model%>Model, I<%=Model%>Fields>(<%=Model%>Model);

export default <%=Model%>Resolver;