CREATE TYPE contact_point_system_code AS ENUM ('url', 'pager', 'fax', 'email', 'sms', 'other', 'phone');
CREATE TYPE contact_point_use_code AS ENUM ('old', 'work', 'home', 'mobile', 'temp');
CREATE TYPE goal_lifecycle_status_code AS ENUM ('cancelled', 'planned', 'accepted', 'active', 'completed', 'proposed', 'entered-in-error', 'on-hold', 'rejected');
CREATE TYPE care_plan_status_code AS ENUM ('draft', 'active', 'unknown', 'completed', 'revoked', 'entered-in-error', 'on-hold');
CREATE TYPE care_plan_intent_code AS ENUM ('order', 'option', 'plan', 'proposal');
CREATE TYPE practitioner_gender_code AS ENUM ('other', 'unknown', 'female', 'male');
CREATE TYPE patient_link_type_code AS ENUM ('replaced-by', 'seealso', 'refer', 'replaces');
CREATE TYPE patient_gender_code AS ENUM ('other', 'unknown', 'female', 'male');
CREATE TYPE consent_provision_data_meaning_code AS ENUM ('dependents', 'instance', 'authoredby', 'related');
CREATE TYPE consent_status_code AS ENUM ('draft', 'active', 'inactive', 'proposed', 'entered-in-error', 'rejected');
CREATE TYPE communication_status_code AS ENUM ('not-done', 'unknown', 'completed', 'stopped', 'entered-in-error', 'on-hold', 'preparation', 'in-progress');
CREATE TYPE communication_priority_code AS ENUM ('urgent', 'asap', 'routine', 'stat');
CREATE TYPE care_plan_activity_detail_kind_code AS ENUM ('CommunicationRequest', 'DeviceRequest', 'VisionPrescription', 'Task', 'Appointment', 'ServiceRequest', 'NutritionOrder', 'MedicationRequest');
CREATE TYPE care_plan_activity_detail_status_code AS ENUM ('cancelled', 'scheduled', 'not-started', 'unknown', 'completed', 'stopped', 'entered-in-error', 'on-hold', 'in-progress');
CREATE TYPE consent_provision_type_code AS ENUM ('permit', 'deny');
CREATE TYPE patient_contact_gender_code AS ENUM ('other', 'unknown', 'female', 'male');
CREATE TYPE human_name_use_code AS ENUM ('old', 'maiden', 'usual', 'anonymous', 'official', 'temp', 'nickname');
CREATE TYPE observation_status_code AS ENUM ('preliminary', 'final', 'registered', 'amended');

CREATE TABLE goal (
	_id SERIAL NOT NULL, 
	id VARCHAR, 
	implicit_rules VARCHAR, 
	language VARCHAR, 
	lifecycle_status goal_lifecycle_status_code, 
	start_date DATE, 
	status_date DATE, 
	status_reason VARCHAR, 
	achievement_status_id INTEGER, 
	priority_id INTEGER, 
	description_id INTEGER, 
	start_codeable_concept_id INTEGER, 
	care_plan_id INTEGER, 
	care_plan_activity_detail_id INTEGER, 
	PRIMARY KEY (_id), 
	CONSTRAINT goal_id_key UNIQUE (id)
)

;
CREATE INDEX ix_goal_id ON goal (id);

CREATE TABLE care_plan (
	_id SERIAL NOT NULL, 
	id VARCHAR, 
	implicit_rules VARCHAR, 
	language VARCHAR, 
	instantiates_canonical JSONB, 
	instantiates_uri JSONB, 
	status care_plan_status_code, 
	intent care_plan_intent_code, 
	title VARCHAR, 
	description VARCHAR, 
	created TIMESTAMP WITH TIME ZONE, 
	care_plan_based_on_id INTEGER, 
	care_plan_replaces_id INTEGER, 
	care_plan_part_of_id INTEGER, 
	PRIMARY KEY (_id), 
	CONSTRAINT care_plan_id_key UNIQUE (id), 
	FOREIGN KEY(care_plan_based_on_id) REFERENCES care_plan (_id), 
	FOREIGN KEY(care_plan_replaces_id) REFERENCES care_plan (_id), 
	FOREIGN KEY(care_plan_part_of_id) REFERENCES care_plan (_id)
)

;
CREATE INDEX ix_care_plan_id ON care_plan (id);

CREATE TABLE practitioner (
	_id SERIAL NOT NULL, 
	id VARCHAR, 
	implicit_rules VARCHAR, 
	language VARCHAR, 
	active BOOLEAN, 
	gender practitioner_gender_code, 
	birth_date DATE, 
	PRIMARY KEY (_id), 
	CONSTRAINT practitioner_id_key UNIQUE (id)
)

;
CREATE INDEX ix_practitioner_id ON practitioner (id);

CREATE TABLE codeable_concept (
	_id SERIAL NOT NULL, 
	text VARCHAR, 
	observation_category_id INTEGER, 
	observation_interpretation_id INTEGER, 
	observation_reference_range_id INTEGER, 
	observation_component_id INTEGER, 
	practitioner_id INTEGER, 
	goal_category_id INTEGER, 
	goal_outcome_code_id INTEGER, 
	consent_id INTEGER, 
	consent_provision_action_id INTEGER, 
	consent_provision_code_id INTEGER, 
	care_plan_id INTEGER, 
	care_plan_activity_id INTEGER, 
	care_plan_activity_detail_id INTEGER, 
	communication_category_id INTEGER, 
	communication_medium_id INTEGER, 
	communication_reason_code_id INTEGER, 
	patient_contact_id INTEGER, 
	PRIMARY KEY (_id)
)

;

CREATE TABLE observation_component (
	_id SERIAL NOT NULL, 
	value_string VARCHAR, 
	value_boolean BOOLEAN, 
	value_integer INTEGER, 
	value_time TIME WITHOUT TIME ZONE, 
	value_date_time TIMESTAMP WITH TIME ZONE, 
	observation_id INTEGER, 
	code_id INTEGER, 
	value_codeable_concept_id INTEGER, 
	data_absent_reason_id INTEGER, 
	PRIMARY KEY (_id)
)

;

CREATE TABLE patient (
	_id SERIAL NOT NULL, 
	id VARCHAR, 
	implicit_rules VARCHAR, 
	language VARCHAR, 
	active BOOLEAN, 
	gender patient_gender_code, 
	birth_date DATE, 
	deceased_boolean BOOLEAN, 
	deceased_date_time TIMESTAMP WITH TIME ZONE, 
	multiple_birth_boolean BOOLEAN, 
	multiple_birth_integer INTEGER, 
	marital_status_id INTEGER, 
	PRIMARY KEY (_id), 
	CONSTRAINT patient_id_key UNIQUE (id)
)

;
CREATE INDEX ix_patient_id ON patient (id);

CREATE TABLE consent (
	_id SERIAL NOT NULL, 
	id VARCHAR, 
	implicit_rules VARCHAR, 
	language VARCHAR, 
	status consent_status_code, 
	date_time TIMESTAMP WITH TIME ZONE, 
	scope_id INTEGER, 
	patient_id INTEGER, 
	policy_rule_id INTEGER, 
	provision_id INTEGER, 
	PRIMARY KEY (_id), 
	CONSTRAINT consent_id_key UNIQUE (id)
)

;
CREATE INDEX ix_consent_id ON consent (id);

CREATE TABLE communication (
	_id SERIAL NOT NULL, 
	id VARCHAR, 
	implicit_rules VARCHAR, 
	language VARCHAR, 
	instantiates_canonical JSONB, 
	instantiates_uri JSONB, 
	status communication_status_code, 
	priority communication_priority_code, 
	sent TIMESTAMP WITH TIME ZONE, 
	received TIMESTAMP WITH TIME ZONE, 
	communication_id INTEGER, 
	status_reason_id INTEGER, 
	topic_id INTEGER, 
	PRIMARY KEY (_id), 
	CONSTRAINT communication_id_key UNIQUE (id)
)

;
CREATE INDEX ix_communication_id ON communication (id);

CREATE TABLE care_plan_activity_detail (
	_id SERIAL NOT NULL, 
	kind care_plan_activity_detail_kind_code, 
	instantiates_canonical JSONB, 
	instantiates_uri JSONB, 
	status care_plan_activity_detail_status_code, 
	do_not_perform BOOLEAN, 
	scheduled_string VARCHAR, 
	description VARCHAR, 
	code_id INTEGER, 
	status_reason_id INTEGER, 
	product_codeable_concept_id INTEGER, 
	PRIMARY KEY (_id)
)

;

CREATE TABLE care_plan_activity (
	_id SERIAL NOT NULL, 
	care_plan_id INTEGER, 
	detail_id INTEGER, 
	PRIMARY KEY (_id)
)

;

CREATE TABLE consent_provision (
	_id SERIAL NOT NULL, 
	type consent_provision_type_code, 
	consent_provision_id INTEGER, 
	PRIMARY KEY (_id), 
	FOREIGN KEY(consent_provision_id) REFERENCES consent_provision (_id)
)

;

CREATE TABLE observation_reference_range (
	_id SERIAL NOT NULL, 
	text VARCHAR, 
	observation_id INTEGER, 
	type_id INTEGER, 
	observation_component_id INTEGER, 
	PRIMARY KEY (_id)
)

;

CREATE TABLE patient_contact (
	_id SERIAL NOT NULL, 
	gender patient_contact_gender_code, 
	patient_id INTEGER, 
	name_id INTEGER, 
	PRIMARY KEY (_id)
)

;

CREATE TABLE human_name (
	_id SERIAL NOT NULL, 
	use human_name_use_code, 
	text VARCHAR, 
	family VARCHAR, 
	given JSONB, 
	prefix JSONB, 
	suffix JSONB, 
	practitioner_id INTEGER, 
	patient_id INTEGER, 
	PRIMARY KEY (_id)
)

;

CREATE TABLE observation (
	_id SERIAL NOT NULL, 
	id VARCHAR, 
	implicit_rules VARCHAR, 
	language VARCHAR, 
	status observation_status_code, 
	effective_date_time TIMESTAMP WITH TIME ZONE, 
	effective_instant TIMESTAMP WITH TIME ZONE, 
	issued TIMESTAMP WITH TIME ZONE, 
	value_string VARCHAR, 
	value_boolean BOOLEAN, 
	value_integer INTEGER, 
	value_time TIME WITHOUT TIME ZONE, 
	value_date_time TIMESTAMP WITH TIME ZONE, 
	code_id INTEGER, 
	value_codeable_concept_id INTEGER, 
	data_absent_reason_id INTEGER, 
	body_site_id INTEGER, 
	method_id INTEGER, 
	goal_id INTEGER, 
	PRIMARY KEY (_id), 
	CONSTRAINT observation_id_key UNIQUE (id)
)

;
CREATE INDEX ix_observation_id ON observation (id);

CREATE TABLE contact_point (
	_id SERIAL NOT NULL, 
	system contact_point_system_code, 
	value VARCHAR, 
	use contact_point_use_code, 
	rank INTEGER, 
	practitioner_id INTEGER, 
	patient_id INTEGER, 
	patient_contact_id INTEGER, 
	PRIMARY KEY (_id), 
	FOREIGN KEY(practitioner_id) REFERENCES practitioner (_id), 
	FOREIGN KEY(patient_id) REFERENCES patient (_id), 
	FOREIGN KEY(patient_contact_id) REFERENCES patient_contact (_id)
)

;

CREATE TABLE consent_verification (
	_id SERIAL NOT NULL, 
	verified BOOLEAN, 
	verification_date TIMESTAMP WITH TIME ZONE, 
	consent_id INTEGER, 
	PRIMARY KEY (_id), 
	FOREIGN KEY(consent_id) REFERENCES consent (_id)
)

;

CREATE TABLE consent_policy (
	_id SERIAL NOT NULL, 
	authority VARCHAR, 
	uri VARCHAR, 
	consent_id INTEGER, 
	PRIMARY KEY (_id), 
	FOREIGN KEY(consent_id) REFERENCES consent (_id)
)

;

CREATE TABLE goal_target (
	_id SERIAL NOT NULL, 
	detail_string VARCHAR, 
	detail_boolean BOOLEAN, 
	detail_integer INTEGER, 
	due_date DATE, 
	goal_id INTEGER, 
	measure_id INTEGER, 
	detail_codeable_concept_id INTEGER, 
	PRIMARY KEY (_id), 
	FOREIGN KEY(goal_id) REFERENCES goal (_id), 
	FOREIGN KEY(measure_id) REFERENCES codeable_concept (_id), 
	FOREIGN KEY(detail_codeable_concept_id) REFERENCES codeable_concept (_id)
)

;

CREATE TABLE patient_communication (
	_id SERIAL NOT NULL, 
	preferred BOOLEAN, 
	patient_id INTEGER, 
	language_id INTEGER, 
	PRIMARY KEY (_id), 
	FOREIGN KEY(patient_id) REFERENCES patient (_id), 
	FOREIGN KEY(language_id) REFERENCES codeable_concept (_id)
)

;

CREATE TABLE patient_link (
	_id SERIAL NOT NULL, 
	type patient_link_type_code, 
	patient_id INTEGER, 
	PRIMARY KEY (_id), 
	FOREIGN KEY(patient_id) REFERENCES patient (_id)
)

;

CREATE TABLE practitioner_qualification (
	_id SERIAL NOT NULL, 
	practitioner_id INTEGER, 
	code_id INTEGER, 
	PRIMARY KEY (_id), 
	FOREIGN KEY(practitioner_id) REFERENCES practitioner (_id), 
	FOREIGN KEY(code_id) REFERENCES codeable_concept (_id)
)

;

CREATE TABLE communication_payload (
	_id SERIAL NOT NULL, 
	content_string VARCHAR, 
	communication_id INTEGER, 
	PRIMARY KEY (_id), 
	FOREIGN KEY(communication_id) REFERENCES communication (_id)
)

;

CREATE TABLE consent_provision_data (
	_id SERIAL NOT NULL, 
	meaning consent_provision_data_meaning_code, 
	consent_provision_id INTEGER, 
	PRIMARY KEY (_id), 
	FOREIGN KEY(consent_provision_id) REFERENCES consent_provision (_id)
)

;

CREATE TABLE consent_provision_actor (
	_id SERIAL NOT NULL, 
	consent_provision_id INTEGER, 
	role_id INTEGER, 
	PRIMARY KEY (_id), 
	FOREIGN KEY(consent_provision_id) REFERENCES consent_provision (_id), 
	FOREIGN KEY(role_id) REFERENCES codeable_concept (_id)
)

;
ALTER TABLE observation ADD FOREIGN KEY(method_id) REFERENCES codeable_concept (_id);
ALTER TABLE care_plan_activity ADD FOREIGN KEY(care_plan_id) REFERENCES care_plan (_id);
ALTER TABLE consent ADD FOREIGN KEY(policy_rule_id) REFERENCES codeable_concept (_id);
ALTER TABLE goal ADD FOREIGN KEY(achievement_status_id) REFERENCES codeable_concept (_id);
ALTER TABLE observation_reference_range ADD FOREIGN KEY(observation_id) REFERENCES observation (_id);
ALTER TABLE human_name ADD FOREIGN KEY(patient_id) REFERENCES patient (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(care_plan_activity_id) REFERENCES care_plan_activity (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(goal_category_id) REFERENCES goal (_id);
ALTER TABLE observation_component ADD FOREIGN KEY(observation_id) REFERENCES observation (_id);
ALTER TABLE care_plan_activity ADD FOREIGN KEY(detail_id) REFERENCES care_plan_activity_detail (_id);
ALTER TABLE consent ADD FOREIGN KEY(provision_id) REFERENCES consent_provision (_id);
ALTER TABLE goal ADD FOREIGN KEY(priority_id) REFERENCES codeable_concept (_id);
ALTER TABLE observation_reference_range ADD FOREIGN KEY(type_id) REFERENCES codeable_concept (_id);
ALTER TABLE patient ADD FOREIGN KEY(marital_status_id) REFERENCES codeable_concept (_id);
ALTER TABLE care_plan_activity_detail ADD FOREIGN KEY(code_id) REFERENCES codeable_concept (_id);
ALTER TABLE goal ADD FOREIGN KEY(description_id) REFERENCES codeable_concept (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(observation_reference_range_id) REFERENCES observation_reference_range (_id);
ALTER TABLE patient_contact ADD FOREIGN KEY(patient_id) REFERENCES patient (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(care_plan_activity_detail_id) REFERENCES care_plan_activity_detail (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(consent_provision_action_id) REFERENCES consent_provision (_id);
ALTER TABLE goal ADD FOREIGN KEY(start_codeable_concept_id) REFERENCES codeable_concept (_id);
ALTER TABLE observation_component ADD FOREIGN KEY(code_id) REFERENCES codeable_concept (_id);
ALTER TABLE goal ADD FOREIGN KEY(care_plan_activity_detail_id) REFERENCES care_plan_activity_detail (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(consent_provision_code_id) REFERENCES consent_provision (_id);
ALTER TABLE observation_component ADD FOREIGN KEY(value_codeable_concept_id) REFERENCES codeable_concept (_id);
ALTER TABLE care_plan_activity_detail ADD FOREIGN KEY(status_reason_id) REFERENCES codeable_concept (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(goal_outcome_code_id) REFERENCES goal (_id);
ALTER TABLE observation_component ADD FOREIGN KEY(data_absent_reason_id) REFERENCES codeable_concept (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(patient_contact_id) REFERENCES patient_contact (_id);
ALTER TABLE care_plan_activity_detail ADD FOREIGN KEY(product_codeable_concept_id) REFERENCES codeable_concept (_id);
ALTER TABLE observation ADD FOREIGN KEY(goal_id) REFERENCES goal (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(observation_component_id) REFERENCES observation_component (_id);
ALTER TABLE patient_contact ADD FOREIGN KEY(name_id) REFERENCES human_name (_id);
ALTER TABLE communication ADD FOREIGN KEY(communication_id) REFERENCES communication (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(observation_category_id) REFERENCES observation (_id);
ALTER TABLE observation_reference_range ADD FOREIGN KEY(observation_component_id) REFERENCES observation_component (_id);
ALTER TABLE observation ADD FOREIGN KEY(code_id) REFERENCES codeable_concept (_id);
ALTER TABLE communication ADD FOREIGN KEY(status_reason_id) REFERENCES codeable_concept (_id);
ALTER TABLE human_name ADD FOREIGN KEY(practitioner_id) REFERENCES practitioner (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(communication_category_id) REFERENCES communication (_id);
ALTER TABLE consent ADD FOREIGN KEY(scope_id) REFERENCES codeable_concept (_id);
ALTER TABLE observation ADD FOREIGN KEY(value_codeable_concept_id) REFERENCES codeable_concept (_id);
ALTER TABLE observation ADD FOREIGN KEY(data_absent_reason_id) REFERENCES codeable_concept (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(communication_medium_id) REFERENCES communication (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(consent_id) REFERENCES consent (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(observation_interpretation_id) REFERENCES observation (_id);
ALTER TABLE communication ADD FOREIGN KEY(topic_id) REFERENCES codeable_concept (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(care_plan_id) REFERENCES care_plan (_id);
ALTER TABLE consent ADD FOREIGN KEY(patient_id) REFERENCES patient (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(practitioner_id) REFERENCES practitioner (_id);
ALTER TABLE observation ADD FOREIGN KEY(body_site_id) REFERENCES codeable_concept (_id);
ALTER TABLE codeable_concept ADD FOREIGN KEY(communication_reason_code_id) REFERENCES communication (_id);
ALTER TABLE goal ADD FOREIGN KEY(care_plan_id) REFERENCES care_plan (_id);
