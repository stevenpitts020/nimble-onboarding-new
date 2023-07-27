import { ProspectContext, ProspectProvider } from "./ProspectContext";
import { InstitutionContext, InstitutionProvider } from "./InstitutionContext";
import {
  DocumentsProvider,
  useDocumentState,
  useDocumentDispatch,
} from "./DocumentsContext";
import { useLoading, LoadingProvider } from "./LoadingContext";
import { useConsents, ConsentsProvider } from "./ConsentsContext";
import { BsaProvider, useBsa } from "./BsaContext";

export {
  ProspectContext,
  ProspectProvider,
  InstitutionContext,
  InstitutionProvider,
  DocumentsProvider,
  useDocumentState,
  useDocumentDispatch,
  useLoading,
  LoadingProvider,
  useConsents,
  ConsentsProvider,
  BsaProvider,
  useBsa,
};
