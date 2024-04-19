package com.stackroute.ssimanagement.model;

import java.math.BigDecimal;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SSI {
	@Id
	@Generated
	private int instructionId;
	@Column(nullable = false)
	private String counterPartyAccountNumber;
	@Column(nullable = false)
	private String counterPartyName;
	@Column(nullable = false)
	private String counterPartyEmail;
	@Column(nullable = false)
	private String swiftCode;
	@Column(nullable = false)
	private String transactionType;
	@Column(nullable = false)
	private String status;
	@Column(nullable = false)
	private String assetDetails;
	@Column(nullable = false)
	private String assetType;
	@Column(nullable = false)
	private int numberOfAsset;
	@Column(nullable = false)
	private Date createdDate;
	@Column(nullable = false)
	private Date deadlineDate;
	@Column(nullable = false)
	private String amountCurrencyType;
	@Column(nullable = false)
	private String denomination;
	@Column(nullable = false)
	private BigDecimal amount;
	@Column(nullable = false)
	private String intermediaryAccountNumber;
	@Column(nullable = false)
	private String beneficiaryAccountNumber;
	@Column(nullable = false)
	private String beneficiaryAccountName;
	@Column(nullable = false)
	private String createdByName;
	@Column(nullable = false)
	private String updatedByName;
	@Column(nullable = false)
	private String reference;
}